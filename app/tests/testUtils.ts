import {store} from '../store';
import {IAxiosResponse} from '../interfaces';

export const TEST_SUCCESS_MESSAGE = 'Operation Successful';
export const TEST_FAIL_MESSAGE = 'Operation unsuccessful';

export const handleSubmitSuccess: jest.Mock<void> = jest.fn<void> (
        (instance: any, successCallBack : any): void => {
            successCallBack(getSuccessResponse());
        }
);

export const  handleSubmitFailure: jest.Mock<void> = jest.fn<void> (
        (instance: any, successCallBack : any, failureCallBack: any): void => {
            failureCallBack(getFailureResponse());
        }
);

export function getSuccessResponse (): IAxiosResponse {
    return {
        data: {message: TEST_SUCCESS_MESSAGE},
    };
}

export function getFailureResponse (): IAxiosResponse {
    return {
        data: {message: TEST_FAIL_MESSAGE},
    };
}

// Type any for rhForms is intentional
export function mockStore (type: string, instance: any): {forms: {rhForms: any}} {
    store.getState = jest.fn((): {forms: {rhForms: any}} => {
        return {
            forms: {rhForms: {[type]: {properties: instance.properties}}},
        };
    });
    
    return null;
}
