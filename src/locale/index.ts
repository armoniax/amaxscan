import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import {StorageHelper} from "@/utils/storage";
// 自动加载多语言字典文件
const langsFiles = require.context('./languages', false, /.ts$/)

const langItems: any[] = []

const langs = langsFiles.keys().reduce((langs: {[index: string]: any}, path) => {
  const lang = langsFiles(path).default
  const { info: { code, name, sort, icon }, dicts } = lang
  langs[code] = { translation: dicts }
  langItems.push({ value: code, label: name, sort: sort, icon: icon })
  return langs
}, {})
const lange = StorageHelper.getItem('lange') ?? 'en';
export const languages = langItems.sort((a, b) => a.sort - b.sort)
i18n.use(LanguageDetector).use(initReactI18next) // init i18next
  .init({
    // 引入资源文件
    resources: langs,
    // 选择默认语言，选择内容为上述配置中的key，即en/zh
    fallbackLng: lange,
    debug: false,
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }
  })
  .catch(() => {})
export default i18n
