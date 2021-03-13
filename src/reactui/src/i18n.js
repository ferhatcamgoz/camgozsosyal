import i18n from "i18next";
import { initReactI18next } from 'react-i18next';



 i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources:{
        en:{
            translation:{
                'Sign Up':'Sign Up',
                "Username":"Username",
                "NickName":"NickName",
                "Password":"Password",
                "Password Repeat":"Password Repeat",
                'Register':'Register',
                "Aynı şifreyi yaz":"Repeat Password Please",
                "Login":"Login",
                "Logins":"Login Page",
                Logout:"Logout",
                Users:"Users",
                "Previus":"Previus",
               "Next":"Next",
                "Load fail":"\"Load fail\""
            }
        },
        tr:{
            translation:{
                'Sign Up':'Kayıt Ol',
                "Username":"Kullanıcı Adı",
                "NickName":"Takma Ad",
                "Password":"Parola",
                "Password Repeat":"Parola Tekrarı",
                'Register':'Kayıt Ol',
                "Aynı şifreyi yaz":"Aynı şifreyi yaz",
                "Login":"Giriş Yap",
                "Logins":"Giriş Sayfası",
                "Logout":"Çıkış Yap",
                "Users":"Kullanıcılar",
                "Previus":"önceki",
                "Next":"ileri",
                "Load fail":"Yükeleme Hatası"
            }
        }
    },
    
    fallbackLng: "tr", // use en if detected lng is not available
    ns:["translation"],
    defaultNS:"translation",
    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false,
      formatSeparator:","
    },
    react:{
        wait:true
    }
  });

export default i18n;