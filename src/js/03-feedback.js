import throttle from 'lodash.throttle';
import { save, load, remove } from './storage';

const formRef = document.querySelector('.feedback-form');
const LOCALE_STORAGE_KEY = 'feedback-form-state';

formRef.addEventListener('input', throttle(onFormInput, 500));
formRef.addEventListener('submit', handleSubmit);

initPage();

function onFormInput(e) {
  const { name, value } = e.target;

  let saveData = load(LOCALE_STORAGE_KEY);
  saveData = saveData ? saveData : {};
  saveData[name] = value;
  save(LOCALE_STORAGE_KEY, saveData);
}

function initPage() {
  const saveData = load(LOCALE_STORAGE_KEY);

  if (!saveData) {
    return;
  }

  Object.entries(saveData).forEach(([name, value]) => {
    formRef.elements[name].value = value;
  });
}

function handleSubmit(e) {
  e.preventDefault();

  const {
    elements: { email, message },
  } = e.currentTarget;
  console.log({ email: email.value, message: message.value });
  e.currentTarget.reset();
  remove(LOCALE_STORAGE_KEY);
}
