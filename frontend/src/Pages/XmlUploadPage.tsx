import { useState } from 'react';

export default function XmlUploadPage() {
  const [medicineId, setMedicineId] = useState('');
  const [category, setCategory] = useState('efficacy');
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) {
      alert('XML 파일을 선택하세요');
      return;
    }

    const formData = new FormData();
    formData.append('medicine_id', medicineId);
    formData.append('category', category);
    formData.append('file', file);

    const res = await fetch('https://your-api-url/admin/upload-xml', {
      method: 'POST',
      body: formData,
    });

    const json = await res.json();
    console.log(json);
    alert('업로드 완료!');
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">XML 업로드</h1>

      <input
        type="number"
        placeholder="medicine_id"
        value={medicineId}
        onChange={(e) => setMedicineId(e.target.value)}
        className="border p-2 w-full"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 w-full"
      >
        <option value="efficacy">효능효과</option>
        <option value="dosage">용법용량</option>
        <option value="warning">주의사항</option>
      </select>

      <input
        type="file"
        accept=".xml"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="border p-2 w-full bg-white"
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        업로드
      </button>
    </div>
  );
}
