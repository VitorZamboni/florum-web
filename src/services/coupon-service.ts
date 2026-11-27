import type { CouponResponse } from "@/commons/coupon";
import type { IResponse } from "@/commons/types";
import api from "@/lib/axios";

const path = 'coupons';

const getByCode = async (code: string): Promise<IResponse<CouponResponse>> => {
    return await api.get<CouponResponse>(`${path}/${encodeURIComponent(code)}`);
}

export const CouponService = {
    getByCode
}
