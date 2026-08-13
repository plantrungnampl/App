import {getOriginalMessage, getReportActionText} from '@libs/ReportActionsUtils';
import {buildOptimisticTaskReportAction} from '@libs/ReportUtils';

import CONST from '@src/CONST';

describe('buildOptimisticTaskReportAction', () => {
    const taskReportID = '123';
    const message = 'Task action message';
    const actionNames = [
        CONST.REPORT.ACTIONS.TYPE.TASK_COMPLETED,
        CONST.REPORT.ACTIONS.TYPE.TASK_REOPENED,
        CONST.REPORT.ACTIONS.TYPE.TASK_CANCELLED,
    ] as const;

    it.each(actionNames)('omits redundant originalMessage text and html for %s', (actionName) => {
        const action = buildOptimisticTaskReportAction(taskReportID, actionName, undefined, message);
        const originalMessage = getOriginalMessage(action);

        expect(originalMessage).not.toHaveProperty('text');
        expect(originalMessage).not.toHaveProperty('html');
        expect(getReportActionText(action)).toBe(message);
    });
});
