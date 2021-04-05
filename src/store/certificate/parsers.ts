import { CertificateTypes } from 'src/store/certificate/types';

export const parseCertificateData = (raw: CertificateTypes.IResponseProps): CertificateTypes.IRenderProps => ({
  userName: raw?.name || '',
  description: raw?.description || '',
  userId: raw?.user_id || -1,
  companyId: raw?.company_id || -1,
  employmentId: raw?.employment_id || -1,
  isExpired: raw?.is_expired || false,
  expirationDate: raw?.expiration_date || '',
  image: raw?.image_url || '',
  imageThumbnail: raw?.image_thumbnail_url || '',
  entityImageThumbnail: raw?.entity_image_thumbnail_url || '',
  percent: raw?.percent || 0,
  gameId: raw?.game_id && raw?.game_id !== 0 ? raw.game_id : null,
  courseId: raw?.course_id && raw?.course_id !== 0 ? raw.course_id : null,
  id: raw?.id || -1,
  uuid: raw?.uuid || '',
  createdDate: raw?.created_at || '',
  courseName: raw?.entity_name || '',
});
