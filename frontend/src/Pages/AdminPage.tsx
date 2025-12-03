import { useState } from 'react';

const API_BASE =
  import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'http://localhost:8000';

const CATEGORY_OPTIONS = [
  { value: 'efficacy', label: '효능·효과' },
  { value: 'dosage', label: '용법·용량' },
  { value: 'warning', label: '주의사항' },
];

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [loginError, setLoginError] = useState('');

  const [medicineId, setMedicineId] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const [uploadMsg, setUploadMsg] = useState('');

  // --------------------------
  // 로그인
  // --------------------------
  const login = async () => {
    const res = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    const text = await res.text();

    if (!text) {
      setLoginError('서버 응답이 비었습니다 (404 가능)');
      return;
    }

    const data = JSON.parse(text);

    if (data.success) {
      setToken(data.token);
      setLoginError('');
    } else {
      setLoginError('비밀번호가 틀렸습니다.');
    }
  };

  // --------------------------
  // 전체 재파싱
  // --------------------------
  const reparseAll = async () => {
    const res = await fetch(`${API_BASE}/admin/reparse-all`, {
      method: 'POST',
      headers: { 'x-admin-token': token },
    });

    const data = await res.json();
    alert(`재파싱 완료! 총 ${data.updated}개 업데이트`);
  };

  // --------------------------
  // XML 업로드
  // --------------------------
  const uploadXML = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('medicine_id', medicineId);
    formData.append('category', category);
    formData.append('file', file);

    const res = await fetch(`${API_BASE}/admin/upload-xml`, {
      method: 'POST',
      headers: { 'x-admin-token': token },
      body: formData,
    });

    const data = await res.json();
    setUploadMsg(data.status === 'success' ? '업로드 완료!' : '오류 발생 ❌');
  };

  return (
    <div className="p-10 max-w-lg mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-8">XML 업로드 (관리자 전용)</h1>

      {/* 로그인 영역 */}
      {!token && (
        <div className="border rounded p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">관리자 로그인</h3>
          <input
            type="password"
            placeholder="관리자 비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-3 py-2 w-full mb-3"
          />
          <button
            onClick={login}
            className="bg-black text-white px-4 py-2 rounded"
          >
            로그인
          </button>

          {loginError && <p className="text-red-500 mt-2">{loginError}</p>}
        </div>
      )}

      {/* 업로드 영역 */}
      {token && (
        <div className="border rounded p-6">
          <h3 className="text-lg font-semibold mb-4">XML 업로드</h3>

          <form onSubmit={uploadXML} className="space-y-4">
            <div>
              <label className="block mb-1">Medicine ID</label>
              <input
                type="number"
                value={medicineId}
                onChange={(e) => setMedicineId(e.target.value)}
                className="border px-3 py-2 w-full"
                required
              />
            </div>

            <div>
              <label className="block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border px-3 py-2 w-full"
                required
              >
                <option value="">카테고리 선택</option>

                {CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1">XML 파일</label>

              {/* 숨겨진 실제 파일 input */}
              <input
                id="xml-file-input"
                type="file"
                accept=".xml"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
              />

              {/* 사용자 정의 버튼 */}
              <label
                htmlFor="xml-file-input"
                className="cursor-pointer inline-block bg-gray-900 text-white px-4 py-2 rounded hover:bg-black transition"
              >
                📄 파일 선택하기
              </label>

              {/* 파일명 표시 */}
              {file && (
                <p className="mt-2 text-sm text-gray-700">
                  선택된 파일: <span className="font-medium">{file.name}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              업로드
            </button>
          </form>

          {uploadMsg && <p className="mt-3 font-medium">{uploadMsg}</p>}

          <button
            onClick={reparseAll}
            className="mt-6 bg-gray-700 text-white px-4 py-2 rounded"
          >
            전체 재파싱
          </button>
        </div>
      )}
    </div>
  );
}
