import axios from 'axios'
import qs from 'qs'


/**
 * AXIOS INSTANCE
 *
 * Her defasinda api url vermemek ve headers'a token vermemek icin
 * bir tane axios ornegi olusturuyoruz. Her zaman bu axios ornegini
 * kullanarak ayni adrese ayni header kullanarak sorgu yapmis oluyoruz.
 */
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    /**
     * TOKEN
     *
     * Strapi'de iki farkli token cesidi var:
     *
     * 1. LOGIN OLAN KULLANICIYA AIT TOKEN
     *    Her user (Strapi admini olmayan) Authenticated rolu alir.
     *    Login olan (Authenticated) kisi hangi strapi datalarina
     *    ve bu datalardan hangi sorgulara (get, post, put, delete) yetkisi var
     *    bunu Strapi den belirleyebiliyoruz.
     *
     * 2. STRAPI ADMIN TOKEN
     *    Bu token istenildigi kadar Strapi panel tarafinda olusturulabiliyor. Bu token amaci ise su:
     *    API default olarak disariya tamamen kapali.
     *    Login olmayan kimse hicbir datayi cekemez. Guvenlik acisindan iyi.
     *    Ama frontend web sitesinden datanin cekilebilmesi lazim login olmadan.
     *    Bu yuzden frontend projede data cekmek icin .env ile suresiz olan Admin token kullanilabilir.
     *    ADMIN token da ikiye ayriliyor.
     *      A. READONLY TOKEN
     *          Yalnizca get islemi yapmani sagliyor. Eger frontend projede herhangi bir post, put, delete
     *          islemi yapilmayacaksa bu token kullanmak daha mantikli.
     *      B. FULL ACCESS TOKEN
     *          Tam yetki token. Her islemi yapmanizi sagliyor.
     */

    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
  },
})

export const request = async ({ locale = 'en', url, filters, populate }) => {

  /**
   * qs (query string kutuphanesi verilen objeden string query olusturuyor)
   * Ornegin:
   * { slug: "a", category: b } => /api/product?slug=a&category=b
   */

  const query = qs.stringify(
    {
      locale,
      /**
       * POPULATE:
       *
       * Strapi performans icin bir modelde iliski varsa o datayi default olarak getirmiyor.
       * Mesela product icinde category iliskisi var. Default olarak gelmiyor,
       * Hangi iliskili datayi doldurarak getirmek istiyorsan bunu populate ile yapabiliyorsun.
       * Ornegin volunteers datasinda user iliskisi var.
       * {
       *    volunteers {
       *      profile {
       *        ...
       *      }
       *      user {
       *        ...
       *      }
       *    }
       * }
       * populate: ["user"] olunca user datasini doldurarak veriyor
       * Default olarak iliskili data gelmiyor normalde
       * populate: "*"" verilirse tum iliskili datalar dolarak gelir
       */
      populate: populate || '*',
      /**
       * FILTERS
       *
       * https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest/filtering-locale-publication.html#find-users-having-john-as-first-name
       * Datayi filtreleyerek getirme durumu
       * Ornegin herhangi bir slug'a gore tek bir faaliyet getirilecek
       * {
       *   filters: {
       *      slug: { $eq: "last-activity" }
       *   }
       * }
       * Yukaridaki filtrenin karsiligi /api/activities?slug=last-activity
       */
      filters,
    },
    {
      // queryi daha okunakli olusturuyor

      encodeValuesOnly: true,
    },
  )

  // TODO Consider a better error handling
  try {
    const response = await instance.get(`/${url}?${query}`)
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}

export const mutate = async ({ locale = 'en', url, id, method = 'post', data }) => {
  instance[method](`/${url}/${id}?${locale}`, data)
}
