import type { Request, Response } from 'express';
import { tokenPrice } from 'utils/price';

export const tokenPriceController = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const data = await tokenPrice(token);

    res.status(200).json({
      token: data?.mintSymbol,
      name: '',
      price: data?.price,
      icon: '',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
  }
};
export const tokenPriceMultiple = async (req: Request, res: Response) => {
  try {
    const tokens = ['SOL', 'USDC', 'ETH'];

    const prices = await Promise.all(
      tokens.map(async (token: string) => {
        const data = await tokenPrice(token);
        return { token: token, price: data?.price, name: '', icon: '' };
      }),
    );

    res.status(200).json({ result: prices });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
  }
};
