'use client';
import * as Yup from 'yup';
import * as XLSX from 'xlsx';
import { useFormik } from 'formik';
import API from '@/service/ApiService';
import React, { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { API_CONSTANT } from '@/constant/ApiConstant';
import Button from '@/Components/Button';
import { toast } from 'react-toastify';
import axios from 'axios';

const questionFiled = [
  'question',
  'option1',
  'option2',
  'option3',
  'option4',
  'answer',
];

const FiledSelect = ({ value, options, onChange, error, placeholder }) => (
  <div className="mb-4 flex-1">
    <CreatableSelect
      value={value}
      options={options}
      onChange={onChange}
      placeholder={placeholder}
    />
    {error && <div className="error">{error}</div>}
  </div>
);

const AdminPage = () => {
  const [data, setData] = useState([]);
  const [list, setList] = useState<any[]>([]);
  const [questionList, setQuestionList] = useState([]);

  const validationSchema = Yup.object().shape({
    field: Yup.object().shape({
      value: Yup.string().required('field is required.'),
    }),
    category: Yup.object().shape({
      value: Yup.string().required('category is required.'),
    }),
    subcategory: Yup.object().shape({
      value: Yup.string().required('subcategory is required.'),
    }),
  });

  const { handleSubmit, setFieldValue, resetForm, values, errors } = useFormik({
    validationSchema,
    enableReinitialize: true,
    initialValues: {
      field: { label: '', value: '' },
      category: { label: '', value: '' },
      subcategory: { label: '', value: '' },
    },
    onSubmit: (val) =>
      !val?.subcategory?.__isNew__ && addExamQuestion(val.subcategory.value),
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    API.get(API_CONSTANT?.GET_SUBCATEGORYS).then(({ data }) => {
      setData(data.data);
    });
  };

  useEffect(() => {
    if (values.subcategory.value && !values.subcategory?.__isNew__) {
      API.get(`/add-exam-questions?category_id=${values.subcategory.value}`)
        .then(({ data }) => {
          setQuestionList(
            data.data.map((e: any) => ({
              answer: e.ans,
              question: e.question,
              option1: e.option[0],
              option2: e.option[1],
              option3: e.option[2],
              option4: e.option[3],
            })),
          );
        })
        .catch((e) => toast.error('Error while fetching questions'));
    }
  }, [values?.subcategory?.value]);

  const addExamQuestion = (category_id: string) => {
    API.post('/add-exam-questions', {
      data: list.map((e) => ({
        category_id,
        ans: e.answer,
        question: e.question,
        option: [e['option1'], e['option2'], e['option3'], e['option4']],
      })),
    })
      .then((res) => {
        setList([]);
        toast.success(res.data.message);
      })
      .catch((e) => toast.error('Error while adding questions'));
  };

  const addCategory = () => {
    API.post(API_CONSTANT?.ADD_CATEGORY, {
      field: values.field.value,
      category: values.category.value,
      subcategory: values.subcategory.value,
    })
      .then((res) => {
        getData();
        resetForm();
        toast.success(res.data.message);
      })
      .catch((e) => toast.error('Error while adding category'));
  };

  const handleFileUpload = ({ target }: any) => {
    const file = target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e?.target?.result as any);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);
      setList(json);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-11/12  max-w-screen-xl rounded-xl bg-white p-6 shadow-md"
      >
        <h2 className="mb-4 text-2xl font-bold">Add Question List</h2>
        {values?.subcategory?.value && (
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            className="mb-4 rounded border border-gray-300 p-1"
          />
        )}
        <div className="flex gap-5">
          <FiledSelect
            value={values.field}
            error={errors.field?.value}
            placeholder="Select a field"
            onChange={(val) => setFieldValue('field', val)}
            options={[...new Set(data?.map((e: any) => e?.field))]?.map(
              (e) => ({ value: e, label: e }),
            )}
          />
          <FiledSelect
            value={values.category}
            error={errors.category?.value}
            placeholder="Select a category"
            onChange={(val) => setFieldValue('category', val)}
            options={[
              ...new Set(
                data
                  ?.filter((e) => e?.field === values?.field?.value)
                  ?.map((e: any) => e?.category),
              ),
            ].map((e) => ({ value: e, label: e }))}
          />
          <FiledSelect
            value={values.subcategory}
            error={errors.subcategory?.value}
            placeholder="Select a subcategory"
            onChange={(val) => setFieldValue('subcategory', val)}
            options={data
              ?.filter((e: any) => e?.category === values?.category?.value)
              ?.map((e: any) => ({ label: e?.subcategory, value: e?._id }))}
          />

          {values.subcategory?.__isNew__ && (
            <div className="flex grow">
              <Button title={'Add Category'} handleClick={addCategory} />
            </div>
          )}
        </div>

        <div className="overflow-auto">
          <table className="min-w-full border bg-white">
            <thead>
              <tr>
                {(list.length ? list : questionList).length > 0 &&
                  questionFiled.map((key) => (
                    <th key={key} className="border px-4 py-2">
                      {key}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {(list.length ? list : questionList).map((row, index) => (
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
        <div className="mt-4 w-48">
          {!!list.length && <Button title={'Create'} />}
        </div>
      </form>

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
