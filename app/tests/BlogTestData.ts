import {BlogModel, IBlog} from '../models/BlogModel';

export const blogInstance: IBlog = {
    id: 1,
    title: 'How to become a great competitive Programmer?',
    subTitle: 'Secret to become champ Programmer',
    author: 'Hardik',
    body: '<p>This blog will tell you how to become great at competitive programming.</p>',
    blogImgSrc: '',
    blogImgFilePath: '',
    type: 'TINYMCE',
    lastUpdated:  new Date('2017-02-24T00:00:00'),
    publishedDate: new Date('2017-02-24T00:00:00'),
    numberOfComments: 0,
    publish: true,
    blogInstanceTags: ['competitive programming', 'algorithms'],
    metaList: [],
};

export const blogModelInstance: BlogModel = new BlogModel(blogInstance);
