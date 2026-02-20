// types/Brand.ts

export interface Brand {
  _id: string;                   // معرف البراند الأساسي
  name: string;                  // اسم البراند
  slug: string;                  // slug للروابط
  image: string;                  // صورة شعار البراند
  description?: string;           // وصف البراند (اختياري)
  website?: string;               // رابط الموقع الرسمي (اختياري)
  createdAt?: string;             // تاريخ الإنشاء (اختياري)
  updatedAt?: string;             // تاريخ التحديث (اختياري)
}
