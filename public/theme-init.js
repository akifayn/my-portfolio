// Tema tercihi: kayıtlı değer varsa onu, yoksa koyu temayı kullan (FOUC önlemek için render'dan önce)
if (localStorage.getItem('theme') === 'light') {
  document.documentElement.classList.remove('dark')
}
