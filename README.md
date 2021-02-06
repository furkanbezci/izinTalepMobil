# izinTalepMobil

Herkese merhabalar. Yönetici ve personel ekranlarının bulunduğu bir uygulama yaptım. Uygulamadan bahsetmem gerekirse:
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
