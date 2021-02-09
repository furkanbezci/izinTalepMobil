# izinTalepMobil

Herkese merhabalar. Yönetici ve personel ekranlarının bulunduğu bir uygulama yaptım.

Uygulamadan bahsetmem gerekirse:

Personel kısmında personel olarak giriş yapıldığında personel kendi ekranına yönlendiriliyor
ve buradan izin talep ediyor. Talep edilen izin ile e-posta ve şifre gönderilerek api a istek atılıyor. 
Api dan gelen yanıt: personelin izin talep ettiği tarih izin başlangıç ve bitiş tarihi, iznin red veya kabul durumu bilgilerini
gösteren bir obje şeklinde oluyor. Biz de bunu liste olarak personel ekranına yazdırıyoruz.

Yönetici ekranında öncelikle giriş ve kaydol seçenekleri mevcut. Kaydol kısmında kişi kendini yönetici olarak kaydedebiliyor.(Deneme amaçlı)
Giriş işlemi veya kayıt işleminden sonra ekranda Personel Ekleme ve Personel İzin Talep Listesi seçenekleri görüntüleniyor.
İzin talep listesinde talepte bulunan personellerin listesi bulunuyor.(useEffect ile bunları api'dan çağırıyoruz.)
 Her izin talebinin altında onay ve red butonları bulunmakta. Yönetici bunlardan birine bastığında api dan ilgili personelin durumu red veya onay şeklinde değiştiriliyor.
Personel kendi ekranında bu değişimi görebiliyor. (Bu da useEffect ile sağlanmakta)

Özetle uygulamanın yaptığı işlem bu şekilde.
Veri tabanı olarak MSSQL kullanılmıştır.

Tek yapmanız gereken npm install deyip uygulamayı çalıştırmak.

![3](https://user-images.githubusercontent.com/72627004/107119818-0ea75900-689b-11eb-88c2-e6c635e0a143.JPG)   ![2](https://user-images.githubusercontent.com/72627004/107119823-12d37680-689b-11eb-8ab0-8d44f602f625.JPG)   ![4](https://user-images.githubusercontent.com/72627004/107119820-11a24980-689b-11eb-9590-972786078151.JPG)   ![Capture](https://user-images.githubusercontent.com/72627004/107119822-123ae000-689b-11eb-89f1-a4d92bc111b7.JPG) ![5](https://user-images.githubusercontent.com/72627004/107119913-9beaad80-689b-11eb-9932-69adc5b21e8c.JPG)





