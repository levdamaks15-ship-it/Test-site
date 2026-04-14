'use client';

import { useState } from 'react';
import { useTranslation } from '@/lib/i18n';
import styles from './BookingCalendar.module.css';
import PaymentModal from './PaymentModal';
import CustomCalendar from './CustomCalendar';

export default function BookingCalendar({ price, currency }: { price: number; currency: string }) {
  const { language, t } = useTranslation();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  
  const calculateTotal = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays * price;
  };

  const total = calculateTotal();

  const handleBooking = () => {
    if (total > 0) {
      setIsPaymentOpen(true);
    } else {
      alert(language === 'ru' ? 'Выберите даты заезда и выезда' : 'Келу және кету күндерін таңдаңыз');
    }
  };

  return (
    <>
      <div className={`${styles.wrapper} glass`}>
        <h3 className={styles.title}>{t('booking.bookNow')}</h3>
        
        <div className={styles.form}>
          <div className={styles.calendarStack}>
            <CustomCalendar 
              label={t('booking.checkIn')}
              selectedDate={startDate}
              onSelect={setStartDate}
            />
            <CustomCalendar 
              label={t('booking.checkOut')}
              selectedDate={endDate}
              onSelect={setEndDate}
            />
          </div>

          {total > 0 && (
            <div className={styles.summary}>
              <div className={styles.totalRow}>
                <span>{language === 'ru' ? 'Итого' : 'Жиыны'}:</span>
                <span className={styles.totalPrice}>
                  {total.toLocaleString('ru-RU')} {currency}
                </span>
              </div>
            </div>
          )}

          <button 
            className="btn-primary" 
            style={{ width: '100%', marginTop: '20px' }}
            onClick={handleBooking}
          >
            {t('booking.bookNow')}
          </button>
          <p className={styles.disclaimer}>
            {language === 'ru' 
              ? 'Вы сможете подтвердить бронирование после проверки доступности менеджером.'
              : 'Менеджер қолжетімділікті тексергеннен кейін брондауды растай аласыз.'}
          </p>
        </div>
      </div>

      <PaymentModal 
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        onSuccess={() => setIsPaymentOpen(false)}
        amount={total}
        currency={currency}
      />
    </>
  );
}
