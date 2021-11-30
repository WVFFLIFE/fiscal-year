/* eslint-disable */

class CrmAction {

    Execute = (opts) => {

        let req = this.GetRequestObject();
        const url = `${top.window.location.protocol}//${top.window.location.hostname}/XRMServices/2011/Organization.svc/web`;
        req.open("POST", url, opts.async);

        let self = this;

        try {
            req.responseType = 'msxml-document';
        }
        catch (e) { }
        req.setRequestHeader("Accept", "application/xml, text/xml, */*");
        req.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
        req.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/xrm/2011/Contracts/Services/IOrganizationService/Execute");
        if (opts.async && opts.successCallback) {
            req.onreadystatechange = function () {
                if (req.readyState == 4) { // "complete"
                    if (req.status == 200) { // "OK"
                        self.ProcessSoapResponse(req.responseXML, opts.successCallback, opts.errorCallback);
                    }
                    else if (req.status == 404 && opts.errorCallback) {
                        opts.errorCallback(new Error("404"));
                    }
                    else {
                        try {

                            self.ProcessSoapError(req.responseXML, opts.errorCallback);
                        }
                        catch (e) { }
                    }
                }
            };
        }

        req.send(opts.requestXml);

        if (!opts.async) {
            if (req.status == 200) {
                return this.ProcessSoapResponse(req.responseXML, opts.successCallback);
            }
            else if (req.status == 500 && req.responseXML != null) {
                return this.ProcessSoapError(req.responseXML, opts.errorCallback);
            }
            else {
                var error = new Error(req.statusText || req.status);
                error.status = req.status;
                return error;
            }
        }
    }

    GetRequestObject = () => {
        let xmlHttp;
        try {
            // Firefox, Opera 8.0+, Safari
            xmlHttp = new XMLHttpRequest();
        }
        catch (e) {
            // Internet Explorer
            try {
                xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch (e) {
                try {

                    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
                }
                catch (e) {
                    alert("Your browser does not support AJAX!");
                    return false;
                }
            }
        }
        return xmlHttp;
    }


    ProcessSoapResponse = (responseXml, successCallback) => {
        this._setSelectionNamespaces(responseXml);
        let objectNodes = this.ObjectifyNodes(this._selectNodes(responseXml, "//a:Results/a:KeyValuePairOfstringanyType"));
        if (successCallback) {
            successCallback(objectNodes);
        }
        return objectNodes;
    }

    ProcessSoapError = (responseXml, errorCallback) => {
        this._setSelectionNamespaces(responseXml);
        let error = new Error(this._getNodeText(this._selectSingleNode(responseXml, "//s:Fault/faultstring")));
        if (errorCallback) {
            error['ResponseXML'] = this.XmlToString(responseXml);
            errorCallback(error);
        }
        return error;
    }

    _setSelectionNamespaces = (doc) => {
        try {
            let namespaces = [
                "xmlns:s='http://schemas.xmlsoap.org/soap/envelope/'",
                "xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'",
                "xmlns:i='http://www.w3.org/2001/XMLSchema-instance'",
                "xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'",
                "xmlns:c='http://schemas.microsoft.com/xrm/2011/Metadata'"
            ];
            doc.setProperty("SelectionNamespaces", namespaces.join(" "));
        } catch (e) { }
    }

    ObjectifyNodes = (nodes) => {
        let result = {};

        for (let i = 0; i < nodes.length; i++) {
            let fieldName = this._getNodeText(nodes[i].firstChild);
            let fieldValue = nodes[i].childNodes[1];
            result[fieldName] = this.ObjectifyNode(fieldValue);
        }

        return result;
    }

    ObjectifyNode = (node) => {
        if (node.attributes != null) {
            if (node.attributes.getNamedItem("i:nil") != null && node.attributes.getNamedItem("i:nil").nodeValue == "true") {
                return null;
            }

            var nodeTypeName = node.attributes.getNamedItem("i:type") == null ? "c:string" : node.attributes.getNamedItem("i:type").nodeValue;

            switch (nodeTypeName) {
                case "a:EntityReference":
                    return {
                        id: this._getNodeText(node.childNodes[0]),
                        entityType: this._getNodeText(node.childNodes[1])
                    };
                case "a:QueryExpression":
                    return true;
                case "a:Entity":
                    return this.ObjectifyRecord(node);
                case "a:EntityCollection":
                    return this.ObjectifyCollection(node.firstChild);
                case "c:dateTime":
                    return this.ParseIsoDate(this._getNodeText(node));
                case "c:guid":
                    return this._getNodeText(node);
                case "c:string":
                    return this._getJsonObject(node);
                case "c:int":
                    return parseInt(this._getNodeText(node));
                case "a:OptionSetValue":
                    return parseInt(this._getNodeText(node.childNodes[0]));
                case "c:boolean":
                    return this._getNodeText(node.childNodes[0]) == "true";
                case "c:double":
                case "c:decimal":
                case "a:Money":
                    return parseFloat(this._getNodeText(node.childNodes[0]));
                default:
                    return null;
            }
        }

        return null;
    }



    ObjectifyCollection = (node) => {
        let result = [];

        for (let i = 0; i < node.childNodes.length; i++) {
            result.push(this.ObjectifyRecord(node.childNodes[i]));
        }

        return result;
    }

    ObjectifyRecord = (node) => {
        let result = {};

        result.logicalName = (node.childNodes[4].text !== undefined) ? node.childNodes[4].text : node.childNodes[4].textContent;
        result.id = (node.childNodes[3].text !== undefined) ? node.childNodes[3].text : node.childNodes[3].textContent;

        result.attributes = this.ObjectifyNodes(node.childNodes[0].childNodes);
        result.formattedValues = this.ObjectifyNodes(node.childNodes[2].childNodes);

        return result;
    }

    ParseIsoDate = (s) => {
        if (s == null || !s.match(this.isoDateExpression))
            return null;

        var dateParts = this.isoDateExpression.exec(s);
        return new Date(Date.UTC(parseInt(dateParts[1], 10),
            parseInt(dateParts[2], 10) - 1,
            parseInt(dateParts[3], 10),
            parseInt(dateParts[4], 10) - (dateParts[8] == "" || dateParts[8] == "Z" ? 0 : parseInt(dateParts[8])),
            parseInt(dateParts[5], 10),
            parseInt(dateParts[6], 10)));
    }


    _selectNodes = (node, xPathExpression) => {
        if (typeof (node.selectNodes) != "undefined") {
            return node.selectNodes(xPathExpression);
        }
        else {
            let output = [];
            let xPathResults = node.evaluate(xPathExpression, node, this._NSResolver, XPathResult.ANY_TYPE, null);
            let result = xPathResults.iterateNext();
            while (result) {
                output.push(result);
                result = xPathResults.iterateNext();
            }
            return output;
        }
    }

    _selectSingleNode = (node, xpathExpr) => {
        if (typeof (node.selectSingleNode) != "undefined") {
            return node.selectSingleNode(xpathExpr);
        }
        else {
            let xpe = new XPathEvaluator();
            let xPathNode = xpe.evaluate(xpathExpr, node, this._NSResolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            return (xPathNode != null) ? xPathNode.singleNodeValue : null;
        }
    }

    _getNodeText = (node) => {
        if (typeof (node.text) != "undefined") {
            return node.text;
        }
        else {
            return node.textContent;
        }
    }

    _getJsonObject = (node) => {
        let text = this._getNodeText(node);
        if (text == null || text == "")
            return null;
        else
            try {
                return JSON.parse(text);
            }
            catch (e) {
                return text;
            }
    }

    _isNodeNull = (node) => {
        if (node == null) {
            return true;
        }

        if ((node.attributes.getNamedItem("i:nil") != null) && (node.attributes.getNamedItem("i:nil").value == "true")) {
            return true;
        }
        return false;
    }

    _getNodeName = (node) => {
        if (typeof (node.baseName) != "undefined") {
            return node.baseName;
        }
        else {
            return node.localName;
        }
    }

    _setSelectionNamespaces = (doc) => {
        try {
            let namespaces = [
                "xmlns:s='http://schemas.xmlsoap.org/soap/envelope/'",
                "xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'",
                "xmlns:i='http://www.w3.org/2001/XMLSchema-instance'",
                "xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'",
                "xmlns:c='http://schemas.microsoft.com/xrm/2011/Metadata'"
            ];
            doc.setProperty("SelectionNamespaces", namespaces.join(" "));
        } catch (e) { }
    }

    _NSResolver = (prefix) => {
        let ns = {
            "s": "http://schemas.xmlsoap.org/soap/envelope/",
            "a": "http://schemas.microsoft.com/xrm/2011/Contracts",
            "i": "http://www.w3.org/2001/XMLSchema-instance",
            "b": "http://schemas.microsoft.com/crm/2011/Contracts",
            "c": "http://schemas.datacontract.org/2004/07/System.Collections.Generic"
        };
        return ns[prefix] || null;
    }

    XmlToString = (xmlData) => {

        let xmlString;
        //IE
        if (window.ActiveXObject) {
            xmlString = xmlData.xml;
        }
        // code for Mozilla, Firefox, Opera, etc.
        else {
            xmlString = (new XMLSerializer()).serializeToString(xmlData);
        }
        return xmlString;
    }

    isoDateExpression = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.?(\d*)?(Z|[+-]\d{2}?(:\d{2})?)?$/;

    GenerateRequestXml = (request, jsonObject) => {
        return `<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
                              <s:Body>
                                <Execute xmlns="http://schemas.microsoft.com/xrm/2011/Contracts/Services" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
                                  <request xmlns:a="http://schemas.microsoft.com/xrm/2011/Contracts">
                                    <a:Parameters xmlns:b="http://schemas.datacontract.org/2004/07/System.Collections.Generic">
                                      <a:KeyValuePairOfstringanyType>
                                        <b:key>Request</b:key>
                                        <b:value i:type='c:string' xmlns:c='http://www.w3.org/2001/XMLSchema'>${this.JsonEncodeURI(jsonObject)}</b:value>
                                      </a:KeyValuePairOfstringanyType>
                                    </a:Parameters>
                                    <a:RequestId i:nil="true" />
                                    <a:RequestName>${request}</a:RequestName>
                                  </request>
                                </Execute>
                              </s:Body>
                            </s:Envelope>`;
    }

    GenerateRequestWithTypeXml = (request, requestType, jsonObject) => {
        return `<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
                              <s:Body>
                                <Execute xmlns="http://schemas.microsoft.com/xrm/2011/Contracts/Services" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
                                  <request xmlns:a="http://schemas.microsoft.com/xrm/2011/Contracts">
                                    <a:Parameters xmlns:b="http://schemas.datacontract.org/2004/07/System.Collections.Generic">
                                      <a:KeyValuePairOfstringanyType>
                                        <b:key>RequestType</b:key>
                                        <b:value i:type='c:int' xmlns:c='http://www.w3.org/2001/XMLSchema'>${requestType}</b:value>
                                      </a:KeyValuePairOfstringanyType>
                                      <a:KeyValuePairOfstringanyType>
                                        <b:key>Request</b:key>
                                        <b:value i:type='c:string' xmlns:c='http://www.w3.org/2001/XMLSchema'>${this.JsonEncodeURI(jsonObject)}</b:value>
                                      </a:KeyValuePairOfstringanyType>
                                    </a:Parameters>
                                    <a:RequestId i:nil="true" />
                                    <a:RequestName>${request}</a:RequestName>
                                  </request>
                                </Execute>
                              </s:Body>
                            </s:Envelope>`;
    }

    JsonEncodeURI = (jsonObject) => {
        if (!jsonObject) return "null";
        return encodeURIComponent(typeof jsonObject == 'object'
            ? JSON.stringify(jsonObject)
            : jsonObject);
    }

}

export default new CrmAction();