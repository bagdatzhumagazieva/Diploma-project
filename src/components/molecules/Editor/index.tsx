import React, { useEffect, useState } from 'react';
import CKEditor from 'ckeditor4-react';
import { LOCAL_STORAGE } from 'src/core/store/values';
import { API } from 'src/constants/server';
import { EditorTypes } from 'src/components/molecules/Editor/types';

function Editor(props: EditorTypes.IProps) {
  const { data, onDataChange } = props;

  const onEditorDataChange = (event: any) => {
    const data = event.editor.getData();
    onDataChange && onDataChange(data);
  };

  const [dataUrl, setDataUrl] = useState<EditorTypes.IDataUrl>();

  useEffect(() => {
    dataUrl && onDataChange && onDataChange(data.replace(dataUrl.url, dataUrl.blobUrl));
  },        [dataUrl, data]);

  const onFileUploadRequest = (event: any) => {
    // Copy contents of 'upload' image field to a new field with 'new_name'
    const requestDataObject = event?.data?.requestData;
    requestDataObject['file'] = requestDataObject['upload'];

    // Delete old 'upload' image field from the request data object
    delete requestDataObject['upload'];
  };

  const onfileUploadResponse = async (event: any) => {
    event.stop();
    // Get XHR and response.
    const data = event.data;
    const xhr = data.fileLoader.xhr;
    const response = JSON.parse(xhr.responseText);

    if (response?.code === 0 && response?.data) {
      data.url = response?.data?.url;
      // Error occurred during upload.
      await fetchImage(response?.data?.url).then(res => res.blob()).then((blob) => {
        data.url = URL.createObjectURL(blob);
      });
      setDataUrl({ url: response?.data?.url, blobUrl: data.url });
    } else {
      data.message = response?.description || 'Error';
      event.cancel();
    }
  };

  const fetchImage = async (url: string) => {
    const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
    return await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const editorConfig = {
    extraPlugins: 'embed,autoembed,colorbutton,colordialog,font,indentlist,' +
      'preview,emoji,magicline,filebrowser,pastefromword,codesnippet,widget,mathjax,mentions,forms,iframe',
    height: 500,
    // Setup content provider. See https://ckeditor.com/docs/ckeditor4/latest/features/media_embed
    embed_provider: '//ckeditor.iframe.ly/api/oembed?url={url}&callback={callback}',

    // Configure the Enhanced Image plugin to use classes instead of styles and to disable the
    // resizer (because image size is controlled by widget styles or the image takes maximum
    // 100% of the editor width).
    mathJaxLib: '//cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-AMS_HTML',
    image2_alignClasses: ['image-align-left', 'image-align-center', 'image-align-right'],
    image2_disableResizer: true,
    format_tags: 'p;h1;h2;h3;h4;h5;h6;pre;address;div',
    filebrowserUploadUrl: `${API}media/company/${localStorage.getItem(LOCAL_STORAGE.COMPANY_UUID)}/files`,
    filebrowserUploadMethod: 'xhr',
    fileTools_requestHeaders: {
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE.TOKEN)}`,
    },
    'Access-Control-Allow-Origin': 'https://microlearning.kz:8443',
  };

  return (
    <CKEditor
      type="classic"
      data={data}
      onChange={onEditorDataChange}
      onFileUploadRequest={onFileUploadRequest}
      onfileUploadResponse={onfileUploadResponse}
      config={editorConfig}
    />
  );
}

export default Editor;
