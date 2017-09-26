import * as React from 'react';
import * as Radium from 'radium';
import {ConfirmationModal, showModal, hideModal} from 'react-hero';
import {CSS} from '../../interfaces';
import {IBlog} from '../../models/BlogModel';
import {Button, Row, Col, Grid, FontAwesomeRadium} from '../reusable-components/reusableComponents';

export interface IImageUploaderProps {
    isCreatePage?: boolean;
    maxSize?: number;
    instance?: IBlog;
    removeImageCallBack?: () => void;
    validationCallBack?: () => void;
    saveImageData?: (key: string, value: any) => void;
}

export interface IImageUploaderState {
    file?: string;
    previewUrl?: string;
}

@Radium
export class ImageUploader extends React.Component<IImageUploaderProps, IImageUploaderState> {

    constructor() {
        super();
        this.state = {file: '', previewUrl: ''};
    }

    componentWillMount = (): void => {
        if (!this.props.isCreatePage) {
            this.setState({
                previewUrl: this.props.instance && this.props.instance.blogImgSrc,
            });
        }
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target[`files`][0];
        if (file.size > this.props.maxSize) {
            this.props.validationCallBack();
            return;
        }

        reader.onloadend = (): void => {
            this.setState({
                file: file,
                previewUrl: reader.result,
            }, (): void => {
                this.props.saveImageData('blogImage', file);
                this.props.saveImageData('blogImageSrc', reader.result);
            });
        };
        reader.readAsDataURL(file);
    }

    clearOldSelectedImage = (event: React.FormEvent<HTMLInputElement>): void => {
        event.target[`value`] = null;
    }

    removeFile = (): void => {
        hideModal();
        this.setState({file: null, previewUrl: null});
        this.props.removeImageCallBack();
    }

    render(): JSX.Element {
        imagePreviewStyle.display =  !this.state.previewUrl ? 'none' : null;
        removeBtnStyle.display = !this.state.previewUrl ? 'none' : null;

        return (
            <Grid>
                <Row>
                    <Col sm={4}>
                        <img style={imagePreviewStyle} src={this.state.previewUrl} />
                    </Col>
                    <Col sm={1} style={removeBtnStyle}>
                        <span onClick={showModal}>
                            <FontAwesomeRadium name="close" />
                        </span>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <Button style={uploadBtnStyle}>
                            Upload Image
                            <input
                                    type="file"
                                    style={inputFileStyle}
                                    onClick={this.clearOldSelectedImage}
                                    onChange={this.handleChange}
                            />
                        </Button>
                        <span style={helpText}>Max 2MB size allowed</span>
                    </Col>
                </Row>
                <ConfirmationModal
                        modalBody="Are you sure want to remove this image?"
                        onConfirm={this.removeFile}
                        onHide={hideModal}
                />
            </Grid>
        );
    }
}

const imagePreviewStyle: CSS = {
    margin: '20px auto',
    height: '100px',
};
const uploadBtnStyle: CSS = {
    zIndex: 2,
    width: '120px',
    height: '35px',
    position: 'relative',
};
const inputFileStyle: CSS = {
    zIndex: 1,
    opacity: 0,
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '120px',
    height: '35px',
};
const helpText: CSS = {
    margin: '5px 0px 10px 10px',
    color: '#737373',
};
const removeBtnStyle: CSS = {
    color: '#000',
    textShadow: '0 1px 0 #fff',
    opacity: .2,
    ':hover': {
        color: '#000',
        cursor: 'pointer',
        opacity: .5,
    },
};
