export namespace SliderTypes {
    export interface IProps {
      photos: IPhoto[];
    }

    export interface IPhoto {
      imgUrl: string;
      imgThumbnailUrl: string;
    }
}
