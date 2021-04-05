import React from 'react';
import { PreloaderTypes } from 'src/components/atoms/Preloader/types';
import Loader from 'src/components/atoms/Loader';

/**
 * Use this component to preloader async data.
 */
const Preloader = (props: PreloaderTypes.IProps): JSX.Element =>
  props.loading ? <Loader {...props} /> : (props.children || <></>);

export default Preloader;
