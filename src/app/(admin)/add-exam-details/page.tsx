'use client';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import * as XLSX from 'xlsx';
import CreatableSelect from 'react-select/creatable';
import API from '@/service/ApiService';
import { API_CONSTANT } from '@/constant/ApiConstant';

const questionFiled = [
  'question',
  'option1',
  'option2',
  'option3',
  'option4',
  'answer',
];

const AdminPage = () => {
  const [data, setData] = useState([]);
  const [selectedData, setselectedData] = useState({
    field: { label: '', value: '' },
    category: { label: '', value: '' },
    subcategory: { label: '', value: '' },
  });

  const [list, setList] = useState<any[]>([]);

  //   const [categories, setCategories] = useState([]);

  //   const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    API.get(API_CONSTANT?.GET_SUBCATEGORYS).then(({ data }) => {
      setData(data.data);
    });
  }, []);

  const insertCatogory = () => {
    API.patch(API_CONSTANT?.GET_SUBCATEGORYS)
      .then((res: any) => {
        // setUserDetails(res?.data?.data);
      })
      .catch((error) => {
        // toast.error(error?.response?.data?.error);
      });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log('🚀 ~ handleFileUpload ~ file:', file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);
      console.log('🚀 ~ handleFileUpload ~ json:', json);
      setList(json);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleCategoryChange = (newValue) => {
    // setSelectedCategory(newValue);
  };

  const handleCategoryCreate = (inputValue) => {
    // const newCategory = { value: inputValue, label: inputValue };
    // setCategories([...categories, newCategory]);
    // setSelectedCategory(newCategory);
  };

  const validationSchema = Yup.object().shape({
    field: Yup.string().required('field is required.'),
    category: Yup.string().required('field is required.'),
    subcategory: Yup.string().required('field is required.'),
  });

  const formik = useFormik({
    validationSchema,
    enableReinitialize: true,
    initialValues: { field: '', category: '', subcategory: '' },
    onSubmit: (val) => {
      console.log('🚀 ~ AdminPage ~ val:', val);
    },
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-11/12  max-w-screen-xl rounded-xl bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Upload Excel Sheet</h2>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="mb-4 rounded border border-gray-300 p-2"
        />
        <div className="flex gap-5">
          <CreatableSelect
            className="mb-4 flex-1"
            value={selectedData.field}
            placeholder="Select or create a field"
            onChange={(field) => setselectedData((e) => ({ ...e, field }))}
            options={[...new Set(data?.map((e: any) => e?.field))]?.map(
              (e) => ({
                value: e,
                label: e,
              }),
            )}
          />
          <CreatableSelect
            className="mb-4 flex-1"
            value={selectedData.category}
            placeholder="Select or create a category"
            options={[
              ...new Set(
                data
                  ?.filter((e) => e?.field === selectedData?.field?.value)
                  ?.map((e: any) => e?.category),
              ),
            ].map((e) => ({ value: e, label: e }))}
            onChange={(category) =>
              setselectedData((e) => ({ ...e, category }))
            }
          />
          <CreatableSelect
            className="mb-4 flex-1"
            value={selectedData.subcategory}
            placeholder="Select or create a category"
            options={[
              ...new Set(
                data
                  ?.filter((e) => e?.category === selectedData?.category?.value)
                  ?.map((e: any) => e?.subcategory),
              ),
            ].map((e) => ({ value: e, label: e }))}
            onChange={(subcategory) =>
              setselectedData((e) => ({ ...e, subcategory }))
            }
          />
        </div>

        <div className="overflow-auto">
          <table className="min-w-full border bg-white">
            <thead>
              <tr>
                {list.length > 0 &&
                  questionFiled.map((key) => (
                    <th key={key} className="border px-4 py-2">
                      {key}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {list.map((row, index) => (
                <tr key={index}>
                  {questionFiled.map((cell, idx) => (
                    <td key={idx} className="border px-4 py-2">
                      {row?.[cell]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button>Submit</button>
      </div>

      {/* <form
        // onSubmit={formik.handleSubmit}
        className="mt-5 w-full max-w-md rounded bg-white p-6 shadow-md"
      >
        <p>Add Filed/Category/Subcategory</p>
        <div className="mb-3">
          <input
            type="text"
            name="email"
            value={formik?.values?.field}
            onChange={formik.handleChange}
            placeholder={'Enter a field name'}
            className="h-12 w-full rounded-xl border border-meta-light-blue-2 pl-4  focus:outline-meta-light-blue-1"
          />
          <CreatableSelect
            className="mb-4"
            // options={categories}
            // value={selectedCategory}
            placeholder="Select or create a category"
          />
          {formik.touched.field && formik.errors.field && (
            <div className="error">{formik.errors.field}</div>
          )}
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="email"
            onChange={formik.handleChange}
            value={formik?.values?.category}
            placeholder={'Enter a category name'}
            className="h-12 w-full rounded-xl border border-meta-light-blue-2 pl-4  focus:outline-meta-light-blue-1"
          />
          {formik.touched.category && formik.errors.category && (
            <div className="error">{formik.errors.category}</div>
          )}
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="email"
            onChange={formik.handleChange}
            value={formik?.values?.subcategory}
            placeholder={'Enter a category name'}
            className="h-12 w-full rounded-xl border border-meta-light-blue-2 pl-4  focus:outline-meta-light-blue-1"
          />
          {formik.touched.subcategory && formik.errors.subcategory && (
            <div className="error">{formik.errors.subcategory}</div>
          )}
        </div>
      </form> */}
    </div>
  );
};

export default AdminPage;
