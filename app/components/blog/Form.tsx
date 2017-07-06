import * as React from 'react';
import * as Axios from 'axios';
import * as Radium from 'radium';
import {RouteComponentProps, withRouter} from 'react-router';
import {connect, MapStateToProps, MapDispatchToPropsFunction} from 'react-redux';
import {store} from '../../store';
import {BlogMetaTags} from '../../components/blog/BlogMetaTags';
import {ImageUploader} from '../../components/common/ImageUploader';
import {BlogModel, IBlog} from '../../models/BlogModel';
import {TinyMCEWrapper} from '../../containers/common/TinyMCEWrapper';
import {MarkdownWrapper, RawContentWrapper} from 'react-hero';
import {Link, Col, Button, Grid, Row, ControlLabel} from '../../components/reusable-components/reusableComponents';
import {IFileUploadResponse, IAxiosResponse, IDispatchProps, IAxiosError, CSS} from '../../interfaces';
import {
    showAlert,
    FormInput,
    IDispatch,
    AlertDismissable,
    IInstancePageProps,
    initializeFormWithInstance,
} from 'react-hero';
import {
    header,
    editorTypes,
    pageHeader,
    textAlignRight,
    BLOG_CREATED,
    BLOG_UPDATED,
    DEFAULT_ERROR_MESSAGE,
    ALERT_SUCCESS,
    ALERT_DANGER,
    IMAGE_SIZE_GT_LIMIT,
} from '../../constants';
const {actions} = require<any>('react-redux-form');
const getFormValues = require<any>('redux-form').getFormValues;

export interface IFormStateProps {
    blogInstance?: IBlog;
    instanceList?: BlogModel[];
}

export interface IFormProps extends IInstancePageProps, IFormStateProps, IDispatchProps, RouteComponentProps<void> {
    handleSubmit?: (
        instance: BlogModel,
        successCallBack?: ((args: any) => void),
        failureCallBack?: ((args: any) => void),
    ) => void;
    handleDelete?: (
        instance: BlogModel,
        successCallBack?: ((args: any) => void),
        failureCallBack?: ((args: any) => void),
    ) => void;
    instance: BlogModel;
    isCreatePage?: boolean;
}

export interface IFormState {
    blogImage?: any;
    blogImageSrc?: string;
    metaTypeList?: string[];
}

export interface IState {
    forms: {
        rhForms: {
            blogCreate?: {
                properties: BlogModel;
            },
            blogEdit?: {
                properties: BlogModel;
            },
        },
    };
}

@Radium
export class FormImpl extends React.Component<IFormProps, IFormState> {

    static resourceName: string = 'blog';
    private modelKey: string;
    private pageTitle: string;
    private modelStoreKey: string;

    constructor() {
        super();
        this.state = {blogImage: null, blogImageSrc: null};
    }

    componentWillMount() : void {
        this.generateModelKey();
        initializeFormWithInstance(this.props.instance, this.props.isCreatePage);
        if (!this.props.isCreatePage) {
            this.fetchMetaTypeList();
            if (this.props.instance.properties.publishedDate) {
                this.props.saveData(`${this.modelStoreKey}.publish`, true);
            }
        }
    }

    fetchMetaTypeList = (): void => {
        BlogModel.fetchMetaTypeList()
            .then((response: IAxiosResponse): void => {
                this.setState({
                    metaTypeList: response.data.metaTypeList,
                });
            }).catch((error: IAxiosResponse): void => {
                this.setState({metaTypeList: []});
            });
    }

    generateModelKey = (): void => {
        let instance: BlogModel = this.props.instance;
        if (this.props.isCreatePage) {
            this.modelKey = `${instance.resourceName}Create`;
            this.pageTitle = 'Create Blog';
        } else {
            this.modelKey = `${instance.resourceName}Edit`;
            this.pageTitle = 'Edit Blog';
        }
        this.modelStoreKey = `rhForms.${this.modelKey}.properties`;
    }

    // TODO Move editor types to react-hero and create common wrapper for all.
    renderEditor = () : JSX.Element => {
        let blogInstance: IBlog = this.props.blogInstance;
        if (blogInstance) {
            switch (blogInstance.type) {
                case 'TINYMCE':
                    return(
                        <TinyMCEWrapper model={`${this.modelStoreKey}.body`}/>
                    );

                case 'MARKDOWN':
                    return(
                        <MarkdownWrapper model={`${this.modelStoreKey}.body`}/>
                    );

                case 'RAWCONTENT':
                    return(
                        <RawContentWrapper model={`${this.modelStoreKey}.body`} />
                    );

                default:
                    return(
                        <TinyMCEWrapper model={`${this.modelStoreKey}.body`}/>
                    );
            }
        }
    }

    fetchStoreInstance = (): BlogModel => {
        let instance: BlogModel = this.props.instance;
        if (store.getState() && store.getState().forms && store.getState().forms[`rhForms`][this.modelKey]) {
            instance.properties = store.getState().forms[`rhForms`][this.modelKey].properties;
        }
        return instance;
    }

    handleSuccess = (success: IAxiosResponse): void => {
        this.props.history.push('/blogs');
        let message: string = this.props.isCreatePage ? BLOG_CREATED : BLOG_UPDATED;
        showAlert(ALERT_SUCCESS, success.data.message || message);
    }

    handleFailure = (error: IAxiosError): void => {
        showAlert(ALERT_DANGER, error.response && error.response.data.message || DEFAULT_ERROR_MESSAGE);
    }

    handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();

        if (this.state.blogImage) {
            BlogModel.uploadImage(this.state.blogImage)
                .then((response: Axios.AxiosXHR<IFileUploadResponse>): void => {
                    this.props.saveData(`${this.modelStoreKey}.blogImgFilePath`, response.data.filepath);
                    this.props.saveData(`${this.modelStoreKey}.blogImgSrc`, this.state.blogImageSrc);
                    this.props.handleSubmit(this.fetchStoreInstance(), this.handleSuccess, this.handleFailure);
                }).catch((error: IAxiosError): void => {
                    this.handleFailure(error);
                });

            return;
        }

        if (!this.props.isCreatePage) {
            let blogMetaTags: Object = getFormValues('blogMetaTags')(store.getState());
            if (blogMetaTags && Object.keys(blogMetaTags).length > 0) {
                let metaList: any = [];
                for (let key in blogMetaTags) {
                    if (blogMetaTags.hasOwnProperty(key)) {
                        metaList.push({type: key, value: blogMetaTags[key]});
                    }
                }
                this.props.saveData(`${this.modelStoreKey}.metaList`, metaList);
            }
            this.props.saveData(`${this.modelStoreKey}.blogImgFilePath`, this.props.instance.properties.blogImgSrc);
        }

        this.props.handleSubmit(this.fetchStoreInstance(), this.handleSuccess, this.handleFailure);
    }

    saveUploadedImageData = (key: string, value): void => {
        this.setState({
            [key]: value,
        } as any);
    }

    removeImage = (): void => {
        this.setState({
            blogImageSrc: null,
        });
        this.props.saveData(`${this.modelStoreKey}.blogImgSrc`, '');
    }

    render(): JSX.Element {
        this.generateModelKey();
        return (
            <div>
                <AlertDismissable alertStyle={alertStyle}/>
                <form id="form" onSubmit={this.handleSubmit}>
                    <Grid fluid={true}>
                        <Grid>
                            <div style={pageHeader}>
                                <h1 style={header}>
                                    <span>{this.pageTitle}</span>
                                </h1>
                            </div>
                        </Grid>
                        <Grid style={contentGrid}>
                            <FormInput
                                    type="text"
                                    propertyName="Title"
                                    propertyValue="Enter Title"
                                    model={`${this.modelStoreKey}.title`}
                            />
                            <FormInput
                                    type="text"
                                    propertyName="Subtitle"
                                    propertyValue="Enter Sub Title"
                                    model={`${this.modelStoreKey}.subTitle`}
                            />
                            <Row>
                                <Col sm={3} style={textAlignRight}>
                                    <label>Image</label>
                                </Col>
                                <Col sm={5}>
                                    <ImageUploader
                                            maxSize={2090000}
                                            isCreatePage={this.props.isCreatePage}
                                            instance={this.props.blogInstance}
                                            validationCallBack={() => {showAlert(ALERT_DANGER, IMAGE_SIZE_GT_LIMIT); }}
                                            saveImageData={this.saveUploadedImageData}
                                            removeImageCallBack={this.removeImage}
                                    />
                                </Col>
                            </Row>
                            <FormInput
                                    type="select"
                                    propertyName="Editor Type"
                                    model={`${this.modelStoreKey}.type`}
                                    enum= {editorTypes}
                            />
                            <Row className="form-group" style={rowStyle}>
                                <Col sm={3}>
                                    <ControlLabel style={textAlignRight}>Body</ControlLabel>
                                </Col>
                                <Col sm={8} id="editor">
                                    {this.renderEditor()}
                                </Col>
                            </Row>
                            <FormInput
                                    type="boolean"
                                    propertyName="Publish"
                                    model={`${this.modelStoreKey}.publish`} />
                            <FormInput
                                    type="text"
                                    propertyName="Tags"
                                    model={`${this.modelStoreKey}.tags`}
                            />
                            {!this.props.isCreatePage ? <BlogMetaTags metaTypeList={this.state.metaTypeList} /> : null}
                            <Row style={rowStyleBottom} className="form-group">
                                <Col sm={4} smOffset={3}>
                                    <Button
                                            style={btnStyle}
                                            bsStyle="primary"
                                            type="submit">
                                        {this.props.isCreatePage ? 'Create' : 'Update'}
                                    </Button>
                                    <Link
                                            style={btnStyle}
                                            className="btn btn-default"
                                            to={'/blog/list'}>
                                        Cancel
                                    </Link>
                                </Col>
                            </Row>
                        </Grid>
                    </Grid>
                </form>
            </div>
        );
    }
}

let mapStateToProps: MapStateToProps<IFormStateProps, IFormProps> =
        (state: IState, ownProps: IFormProps): IFormStateProps => {

    let rhForms: {blogCreate?: {properties: BlogModel}, blogEdit?: {properties: BlogModel}} =
            state.forms && state.forms.rhForms;
    let modelKey: string = ownProps.isCreatePage ? 'blogCreate' : 'blogEdit';
    let blogInstance: IBlog;

    if (rhForms && rhForms[modelKey] && rhForms[modelKey][`properties`]) {
        blogInstance = rhForms[modelKey][`properties`];
    }

    return {
        blogInstance,
    };
};

let mapDispatchToProps: MapDispatchToPropsFunction<IDispatchProps, IFormProps> =
        (dispatch: IDispatch) : IDispatchProps => {
    return {
        saveData: (model: string, value: any) => {
            dispatch(actions.change(model, value));
        },
    };
};

export const Form = withRouter(connect(mapStateToProps, mapDispatchToProps)(FormImpl));

const rowStyle : CSS = {
    margin: '0px',
};
const rowStyleBottom : CSS = {
    margin: '0px',
    padding: '15px',
};
const contentGrid : CSS = {
    '@media (maxWidth: 767px)': {
        padding: '0px',
    },
};
const btnStyle: CSS = {
    margin: '10px 10px 10px 0px',
};
const alertStyle: CSS = {
    margin: '65px 0px 0px 0px',
    position: 'fixed',
    width: '100%',
    textAlign: 'center',
};
