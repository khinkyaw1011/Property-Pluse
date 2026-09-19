import {authOptions} from '@/utils/authOption';

export function convertToSerializableObject(leanDocument) {
  if (!leanDocument || typeof leanDocument !== 'object') {
    return leanDocument;
  }
  for (const key of Object.keys(leanDocument)) {
    if (
      leanDocument[key]?.toJSON &&
      leanDocument[key]?.toString
    ) {
      leanDocument[key] = leanDocument[key].toString();
    }
  }
  return leanDocument;
}