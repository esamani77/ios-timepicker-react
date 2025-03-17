import React, { useEffect, useState } from 'react';
import HourFormat from './HourFormat';
import HourWheel from './HourWheel';
import MinuteWheel from './MinuteWheel';

function TimePickerSelection({
   pickerDefaultValue,
   initialValue,
   onChange,
   height,
   onSave,
   onCancel,
   cancelButtonText,
   saveButtonText,
   controllers,
   setInputValue,
   setIsOpen,
   seperator,
   use12Hours,
   onAmPmChange,
}) {
   const initialTimeValue = use12Hours ? initialValue.slice(0, 5) : initialValue;
   const [value, setValue] = useState(
      initialValue === null ? pickerDefaultValue : initialTimeValue,
   );
   const [hourFormat, setHourFormat] = useState({
      mount: false,
      hourFormat: initialValue.slice(6, 8),
   });

   useEffect(() => {
      if (controllers === false) {
         const finalSelectedValue = use12Hours ? `${value} ${hourFormat.hourFormat}` : value;
         setInputValue(finalSelectedValue);
         onChange(finalSelectedValue);
      }
   }, [value]);

   useEffect(() => {
      if (hourFormat.mount) {
         onAmPmChange(hourFormat.hourFormat);
      }
   }, [hourFormat]);

   const params = {
      height,
      value,
      setValue,
      controllers,
      use12Hours,
      onAmPmChange,
      setHourFormat,
      hourFormat,
   };

   const handleSave = () => {
      const finalSelectedValue = use12Hours ? `${value} ${hourFormat.hourFormat}` : value;
      setInputValue(finalSelectedValue);
      onChange(finalSelectedValue);
      onSave(finalSelectedValue);
      setIsOpen(false);
   };
   const handleCancel = () => {
      onCancel();
      setIsOpen(false);
   };

   return (
      <div className="ios-timepicker-react  ios-timepicker-react-transition">
         {controllers && (
            <div className="ios-timepicker-react-btn-container">
               <button
                  className="ios-timepicker-react-btn ios-timepicker-react-btn-cancel"
                  onClick={handleCancel}
               >
                  {cancelButtonText}
               </button>
               <button className="ios-timepicker-react-btn" onClick={handleSave}>
                  {saveButtonText}
               </button>
            </div>
         )}
         <div className="ios-timepicker-react-container" style={{ height: `${height * 5 + 40}px` }}>
            <div
               className="ios-timepicker-react-selected-overlay"
               style={{
                  top: `${height * 2 + 20}px`,
                  height: `${height}px`,
               }}
            />
            <HourWheel {...params} />
            {seperator && <div className="ios-timepicker-react-colon">:</div>}
            <MinuteWheel {...params} />
            {use12Hours && <HourFormat {...params} />}
         </div>
      </div>
   );
}

export default TimePickerSelection;
