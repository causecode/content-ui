import * as React from 'react';
import * as Axios from 'axios';
import {FormInput, IInstancePageProps, AlertDismissable, showAlert, hideAlert, TinyMCEWrapper} from 'react-hero';
import {FormGroup, Col, Button, Grid} from 'react-bootstrap';
import {setMargin, defaultFont, title, fontSize, fontWeight} from '../../constants';
import {RouteComponentProps} from 'react-router';
import {store} from '../../store';
import {PageModel} from '../../models/PageModel';
import {Row, Panel, Link} from '../../components/reusable-components/reusableComponents';

export interface IPageEditPageProps extends IInstancePageProps {
    handleSubmit: (
        instance: PageModel,
        successCallBack?: (response?: Axios.AxiosXHR<{message?: string}>) => void,
        failureCallBack?: () => void,
    ) => void;
    instance: PageModel;
    isCreatePage: boolean;
}

export class PageEditPage extends React.Component<IPageEditPageProps & RouteComponentProps<void>, void> {
    static resourceName: string = 'page';

    componentWillMount = (): void => {
        hideAlert();
    }

    goToListingPage = (): void => {
        this.props.history.push('/page/list');
    }

    fetchPageInstance = (): PageModel => {
        let {instance} = this.props;
        let instanceKey: string = this.getFormKey();
        if (store.getState() && store.getState().forms) {
            instance.properties = store.getState().forms[`rhForms`][instanceKey].properties;
        }

        return instance;
    }

    handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        // Not using connect here to avoid rerendering of component on change of instance properties.
        this.props.handleSubmit(
                this.fetchPageInstance(),
                (response: Axios.AxiosXHR<{message: string}>): void => {
                    showAlert('success', `Page ${this.props.isCreatePage ? 'created' : 'updated'} successfully`, 7000);
                    this.goToListingPage();
                },
                (): void => {
                    showAlert('warning', 'Something went wrong while saving the data.');
                },
        );
    }

    renderButton = (buttonText: string): JSX.Element => {
        return (
            <Button style={setMargin('0px 10px')} type="submit" bsStyle="primary">
                {buttonText}
            </Button>
        );
    }

    getFormKey = (): string => {
        return `${PageEditPage.resourceName}${this.props.isCreatePage ? 'Create' : 'Edit'}`;
    }

    render(): JSX.Element {
        let {isCreatePage} = this.props;
        let modelInstanceKey: string = `rhForms.${this.getFormKey()}.properties`;

        return (
            <div>
                <AlertDismissable alertFontStyle={defaultFont}/>
                <form onSubmit={this.handleSubmit} style={setMargin('80px auto')}>
                    <Grid>
                        <Row>
                            <h1 style={[title, fontWeight(600), fontSize(32), defaultFont]}>
                                {isCreatePage ? 'New page form' : ''}
                            </h1>
                        </Row>
                        <FormInput
                                type="text"
                                propertyName="Title"
                                model={`${modelInstanceKey}.title`}
                                fieldSize={5}
                                labelSize={1}
                        />
                        <FormInput
                                type="text"
                                propertyName="Subtitle"
                                model={`${modelInstanceKey}.subTitle`}
                                fieldSize={5}
                                labelSize={1}
                        />
                        <FormInput
                                type="boolean"
                                propertyName="Publish"
                                model={`${modelInstanceKey}.publish`}
                                fieldSize={5}
                                labelSize={1}
                        />
                        <Row>
                            <Panel
                                    header={<strong>{`${isCreatePage ? 'Add' : 'Update'}`} the page content:</strong>}
                                    style={setMargin('15px 13px 15px 54px')}>
                                <ul style={[{color: '#444'}, defaultFont]}>
                                    <li>
                                        Please {`${isCreatePage ? 'add' : 'update'}`} the content
                                        of the {`${isCreatePage ? 'new' : ''}`} page in the field provided below.
                                    </li>
                                    <li>
                                        To see the preview click on <strong>View</strong> from the toolbar and
                                         select <strong>Preview</strong>.
                                    </li>
                                </ul>
                            </Panel>
                        </Row>
                        <TinyMCEWrapper
                                model={`${modelInstanceKey}.body`}
                                config={{
                                    plugins: [
                                        'advlist autolink lists link image charmap print',
                                        'preview hr anchor pagebreak searchreplace wordcount visualblocks',
                                        'insertdatetime media nonbreaking save table contextmenu directionality',
                                        'emoticons template paste textcolor colorpicker textpattern imagetools',
                                        'codesample toc visualchars code',
                                    ],
                                    toolbar: [
                                        `undo redo | styleselect | bold italic | alignleft aligncenter alignright
                                        alignjustify | bullist numlist outdent indent | link, code preview fullscreen |
                                        forecolor backcolor`,
                                    ],
                                    height: '300px',
                                }}
                                style={setMargin('15px 0px 15px 40px')}
                        />
                        <FormGroup>
                            <Col sm={4}>
                                {this.renderButton(isCreatePage ? 'Create' : 'Update')}
                                <Link style={{margin: '0px 10px'}} className="btn btn-default" to="/page/list">
                                    Cancel
                                </Link>
                            </Col>
                        </FormGroup>
                    </Grid>
                </form>
            </div>
        );
    }
}
