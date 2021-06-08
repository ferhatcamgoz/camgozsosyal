import i18n from "i18next";
import { initReactI18next } from 'react-i18next';
import {register} from "timeago.js";
import React from "react";

 i18n
  .use(initReactI18next)
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
                "Load fail":"\"Load fail\"",
                UserNotFOUNT:"UserNotFOUNT",
                Edit:"Edit",
                Save:"Save",
                Cancel:"Cancel",
                Send:"Send",
                "Delete Message":"Delete Message",
                "Are your sure to delete message?":"\"Are your sure to delete message?\"",
                Delete:"Delete",
                DeleteAcount:"Delete My Account"
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
                "Load fail":"Yükeleme Hatası",
                UserNotFOUNT:"Kullanıcı Bulunamadı",
                Edit:"Düzenle",
                Save:"Kaydet",
                Cancel:"İptal Et",
                Send:"Gönder",
                "Delete Message":"Mesajı Sil",
                "Are your sure to delete message?":"Messajı silmek istediğinizden emin misiniz?",
                Delete:"Sil",
                "DeleteAcount":"Hesabımı Sil"

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
const timeTr =(number, index)=> {
    return [
        ['az önce', 'şimdi'],
        ['%s saniye önce', '%s saniye içinde'],
        ['1 dakika önce', '1 dakika içinde'],
        ['%s dakika önce', '%s dakika içinde'],
        ['1 saat önce', '1 saat içinde'],
        ['%s saat önce', '%s saat içinde'],
        ['1 gün önce', '1 gün içinde'],
        ['%s gün önce', '%s gün içinde'],
        ['1 hafta önce', '1 hafta içinde'],
        ['%s hafta önce', '%s hafta içinde'],
        ['1 ay önce', '1 ay içinde'],
        ['%s ay önce', '%s ay içinde'],
        ['1 yıl önce', '1 yıl içinde'],
        ['%s yıl önce', '%s yıl içinde'],
    ][index];
}
register("tr",timeTr)

export default i18n;