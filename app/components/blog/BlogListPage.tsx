import * as React from 'react';
import * as Radium from 'radium';
import {store} from '../../store';
import {BlogAction} from './BlogAction';
import {BlogModel} from '../../models/BlogModel';
import {IAxiosResponse, IAxiosError, CSS} from '../../interfaces';
import {
    alertStyle,
    getDefaultHeaders,
    BLOG_DELETED,
    ALERT_SUCCESS,
    ALERT_DANGER,
    DEFAULT_ERROR_MESSAGE,
} from '../../constants';
import {
    AlertDismissable,
    PagedList,
    DropDownFilter,
    showAlert,
    ConfirmationModal,
    showModal,
    hideModal,
} from 'react-hero';

@Radium
export class BlogListPage extends React.Component<void, void> {

    static resourceName: string = 'blog';

    renderBlogActions = (): JSX.Element => {
        return (
            <BlogAction deleteBlog={this.deleteBlog}/>
        );
    }

    private deleteBlogId: number = -1;

    deleteBlog = (id: number, modalClosed: boolean = false): void => {
        if (!modalClosed) {
            this.deleteBlogId = id;
            showModal();
            return;
        }

        hideModal();
        if (store.getState() && store.getState().data) {
            let instanceList: BlogModel[] = store.getState().data.get(`blogList`).toJS().instanceList;

            instanceList.every((instance: BlogModel): boolean => {
                if (instance.properties.id === id) {
                    instance.$delete(true, getDefaultHeaders(),
                    (response: IAxiosResponse): void => {
                        showAlert(ALERT_SUCCESS, BLOG_DELETED);
                        BlogModel.list();
                    }, (error: IAxiosError): void => {
                        showAlert(ALERT_DANGER, DEFAULT_ERROR_MESSAGE);
                    });

                    return false;
                }

                return true;
            });
        }
    }

    render(): JSX.Element {
        return (
            <div>
                <AlertDismissable alertStyle={alertStyle}/>
                <div style={listContainer}>
                    <PagedList
                            max={10}
                            resource={BlogListPage.resourceName}
                            customActions={this.renderBlogActions()}
                            showDefaultActions={false}>
                        <DropDownFilter
                                label="Published"
                                paramName="published"
                                possibleValues={[
                                    {label: 'Published', value: 'true'},
                                    {label: 'Unpublished', value: 'false'},
                                ]}
                        />
                    </PagedList>
                </div>
                <ConfirmationModal
                        modalBody={'Are you sure want to delete this blog?'}
                        onConfirm={(): void => {this.deleteBlog(this.deleteBlogId, true); }}
                        onHide={hideModal}
                />
            </div>
        );
    }
}

const listContainer: CSS = {
    padding: '0px 30px',
    margin: '0px 10%',
};
