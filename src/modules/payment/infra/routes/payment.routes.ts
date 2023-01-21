import axios from 'axios';
import { Router } from 'express';
import fs from 'fs';
import parseXml from 'xml2js';

const pay = Router();
const ws = axios.create({
  baseURL: 'https://ws.sandbox.pagseguro.uol.com.br/',
});

pay.post('/session', async (req, res) => {
  const resp = await ws.post(
    '/sessions?appId=app5679017007&appKey=4033C10F0000C47AA4AF7F85B5EC75F5',
  );

  const rs = resp.data;

  return res.json(rs);
});

pay.post('/brand', async (req, res) => {
  const { tk, creditCard } = req.body;
  const resp = await axios.get(
    'https://df.uol.com.br/df-fe/mvc/creditcard/v1/getBin',
    {
      params: {
        tk,
        creditCard,
      },
    },
  );

  return res.json(resp.data);
});

pay.post('/parc', async (req, res) => {
  const { installment, brand, amount, sessionId } = req.body;

  const resp = await axios.get(
    ' https://sandbox.pagseguro.uol.com.br/checkout/v2/installments.json',
    {
      params: {
        maxInstallmentNoInterest: installment,
        creditCardBrand: brand,
        amount,
        sessionId,
      },
    },
  );

  return res.json(resp.data);
});

export { pay };
