import {getLanguage} from '../../store/actions';

export const Data = {
  en: {
    employee_list: 'Employee List',
    employees: 'Employees',
    add_new: 'Add New',
    add_employee: 'Add Employee',
    edit_employee: 'Edit Employee',
    first_name: 'First Name',
    last_name: 'Last Name',
    date_of_employment: 'Date of Employment',
    date_of_birth: 'Date of Birth',
    phone: 'Phone',
    email: 'Email',
    department: 'Department',
    position: 'Position',
    actions: 'Actions',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    proceed: 'Proceed',
    confirm_delete: 'Are you sure?',
    delete_message:
      'Selected Employee record of #{firstName} #{lastName} will be deleted',
    edited_save_message:
      'Newly edited Employee record of #{firstName} #{lastName} will be saved',
    bulk_delete_message: 'Selected Employee records will be deleted',
    bulk_delete_label: 'Delete #{count} Employees',
    search: 'Search Employees...',
  },
  tr: {
    employee_list: 'Çalışan Listesi',
    employees: 'Çalışanlar',
    add_new: 'Yeni Ekle',
    add_employee: 'Çalışan Ekle',
    edit_employee: 'Çalışanı Düzenle',
    first_name: 'Ad',
    last_name: 'Soyad',
    date_of_employment: 'İşe Giriş Tarihi',
    date_of_birth: 'Doğum Tarihi',
    phone: 'Telefon',
    email: 'E-posta',
    department: 'Departman',
    position: 'Pozisyon',
    actions: 'İşlemler',
    edit: 'Düzenle',
    delete: 'Sil',
    save: 'Kaydet',
    cancel: 'İptal',
    proceed: 'Devam',
    confirm_delete: 'Emin misiniz?',
    delete_message: '#{firstName} #{lastName} adlı çalışan kaydı silinecek',
    edited_save_message:
      '#{firstName} #{lastName} adlı çalışan kaydı kaydedilecek',
    bulk_delete_message: 'Seçilen çalışan kayıtları silinecek',
    bulk_delete_label: '#{count} Çalışanı Sil',
    search: 'Çalışanları Ara...',
  },
};

export const getLocalizedData = (key) => {
  return Data[getLanguage()][key];
};
