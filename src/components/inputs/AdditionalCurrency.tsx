import React, { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

const AdditionalCurrency: React.FC = () => {
  const [additionalCurrency, setAdditionalCurrency] = useState('EUR');
  const [conversionFactor, setConversionFactor] = useState('0.8500');

  const currencies = [
    { value: 'EUR', label: 'EUR - Euro' },
    { value: 'GBP', label: 'GBP - British Pound Sterling' },
    { value: 'AZN', label: 'AZN - Azerbaijani Manat' },
    { value: 'JPY', label: 'JPY - Japanese Yen' },
  ];

  const handleSave = () => {
    console.log('Saving currency settings:', { additionalCurrency, conversionFactor });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <Button onClick={handleSave}>
          Save Currency
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Additional Currency"
          value={additionalCurrency}
          onChange={setAdditionalCurrency}
          options={currencies}
        />

        <Input
          label="Conversion Factor"
          value={conversionFactor}
          onChange={setConversionFactor}
          placeholder="Enter conversion factor"
          type="number"
          step="0.0001"
          min="0"
          helperText="Conversion rate from base currency"
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Conversion Preview</h4>
        <p className="text-blue-700 text-sm">
          1 USD = {conversionFactor} {additionalCurrency}
        </p>
        <p className="text-blue-700 text-sm">
          100 USD = {(parseFloat(conversionFactor) * 100).toFixed(4)} {additionalCurrency}
        </p>
      </div>
    </div>
  );
};

export default AdditionalCurrency;