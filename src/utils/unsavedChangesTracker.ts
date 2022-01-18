/**
 * Class is used for tracking unsaved changes
 * in each tab of fiscal year module
 */
class UnsavedChangesTracker {
  hasUnsavedChanges: boolean;
  private pendingAction: Function | null;
  private saveAction: (() => Promise<boolean | undefined>) | null;

  constructor() {
    this.hasUnsavedChanges = false;
    this.pendingAction = null;
    this.saveAction = null;
  }

  setHasUnsavedChanges(flag: boolean) {
    this.hasUnsavedChanges = flag;
  }

  setPendingAction(action: Function | null) {
    this.pendingAction = action;
  }

  executeSaveAction = async () => {
    return this.saveAction && (await this.saveAction());
  };

  executePendingAction() {
    this.pendingAction && this.pendingAction();
  }

  addSaveAction(action: () => Promise<boolean | undefined>) {
    this.setHasUnsavedChanges(true);
    this.saveAction = action;
  }

  resetSaveAction() {
    this.setHasUnsavedChanges(false);
    this.saveAction = null;
  }
}

export default new UnsavedChangesTracker();
