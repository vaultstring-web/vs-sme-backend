import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model SmeApplicationData
 *
 */
export type SmeApplicationDataModel = runtime.Types.Result.DefaultSelection<Prisma.$SmeApplicationDataPayload>;
export type AggregateSmeApplicationData = {
    _count: SmeApplicationDataCountAggregateOutputType | null;
    _avg: SmeApplicationDataAvgAggregateOutputType | null;
    _sum: SmeApplicationDataSumAggregateOutputType | null;
    _min: SmeApplicationDataMinAggregateOutputType | null;
    _max: SmeApplicationDataMaxAggregateOutputType | null;
};
export type SmeApplicationDataAvgAggregateOutputType = {
    yearsInOperation: number | null;
    loanAmount: number | null;
    paybackPeriodMonths: number | null;
    estimatedMonthlyTurnover: number | null;
    estimatedMonthlyProfit: number | null;
    groupMemberCount: number | null;
};
export type SmeApplicationDataSumAggregateOutputType = {
    yearsInOperation: number | null;
    loanAmount: number | null;
    paybackPeriodMonths: number | null;
    estimatedMonthlyTurnover: number | null;
    estimatedMonthlyProfit: number | null;
    groupMemberCount: number | null;
};
export type SmeApplicationDataMinAggregateOutputType = {
    id: string | null;
    applicationId: string | null;
    businessName: string | null;
    registrationNo: string | null;
    businessType: string | null;
    yearsInOperation: number | null;
    loanProduct: string | null;
    loanAmount: number | null;
    paybackPeriodMonths: number | null;
    purposeOfLoan: string | null;
    repaymentMethod: string | null;
    estimatedMonthlyTurnover: number | null;
    estimatedMonthlyProfit: number | null;
    groupName: string | null;
    groupMemberCount: number | null;
    hasOutstandingLoans: boolean | null;
    outstandingLoanDetails: string | null;
    hasDefaulted: boolean | null;
    defaultExplanation: string | null;
};
export type SmeApplicationDataMaxAggregateOutputType = {
    id: string | null;
    applicationId: string | null;
    businessName: string | null;
    registrationNo: string | null;
    businessType: string | null;
    yearsInOperation: number | null;
    loanProduct: string | null;
    loanAmount: number | null;
    paybackPeriodMonths: number | null;
    purposeOfLoan: string | null;
    repaymentMethod: string | null;
    estimatedMonthlyTurnover: number | null;
    estimatedMonthlyProfit: number | null;
    groupName: string | null;
    groupMemberCount: number | null;
    hasOutstandingLoans: boolean | null;
    outstandingLoanDetails: string | null;
    hasDefaulted: boolean | null;
    defaultExplanation: string | null;
};
export type SmeApplicationDataCountAggregateOutputType = {
    id: number;
    applicationId: number;
    businessName: number;
    registrationNo: number;
    businessType: number;
    yearsInOperation: number;
    loanProduct: number;
    loanAmount: number;
    paybackPeriodMonths: number;
    purposeOfLoan: number;
    repaymentMethod: number;
    estimatedMonthlyTurnover: number;
    estimatedMonthlyProfit: number;
    groupName: number;
    groupMemberCount: number;
    hasOutstandingLoans: number;
    outstandingLoanDetails: number;
    hasDefaulted: number;
    defaultExplanation: number;
    _all: number;
};
export type SmeApplicationDataAvgAggregateInputType = {
    yearsInOperation?: true;
    loanAmount?: true;
    paybackPeriodMonths?: true;
    estimatedMonthlyTurnover?: true;
    estimatedMonthlyProfit?: true;
    groupMemberCount?: true;
};
export type SmeApplicationDataSumAggregateInputType = {
    yearsInOperation?: true;
    loanAmount?: true;
    paybackPeriodMonths?: true;
    estimatedMonthlyTurnover?: true;
    estimatedMonthlyProfit?: true;
    groupMemberCount?: true;
};
export type SmeApplicationDataMinAggregateInputType = {
    id?: true;
    applicationId?: true;
    businessName?: true;
    registrationNo?: true;
    businessType?: true;
    yearsInOperation?: true;
    loanProduct?: true;
    loanAmount?: true;
    paybackPeriodMonths?: true;
    purposeOfLoan?: true;
    repaymentMethod?: true;
    estimatedMonthlyTurnover?: true;
    estimatedMonthlyProfit?: true;
    groupName?: true;
    groupMemberCount?: true;
    hasOutstandingLoans?: true;
    outstandingLoanDetails?: true;
    hasDefaulted?: true;
    defaultExplanation?: true;
};
export type SmeApplicationDataMaxAggregateInputType = {
    id?: true;
    applicationId?: true;
    businessName?: true;
    registrationNo?: true;
    businessType?: true;
    yearsInOperation?: true;
    loanProduct?: true;
    loanAmount?: true;
    paybackPeriodMonths?: true;
    purposeOfLoan?: true;
    repaymentMethod?: true;
    estimatedMonthlyTurnover?: true;
    estimatedMonthlyProfit?: true;
    groupName?: true;
    groupMemberCount?: true;
    hasOutstandingLoans?: true;
    outstandingLoanDetails?: true;
    hasDefaulted?: true;
    defaultExplanation?: true;
};
export type SmeApplicationDataCountAggregateInputType = {
    id?: true;
    applicationId?: true;
    businessName?: true;
    registrationNo?: true;
    businessType?: true;
    yearsInOperation?: true;
    loanProduct?: true;
    loanAmount?: true;
    paybackPeriodMonths?: true;
    purposeOfLoan?: true;
    repaymentMethod?: true;
    estimatedMonthlyTurnover?: true;
    estimatedMonthlyProfit?: true;
    groupName?: true;
    groupMemberCount?: true;
    hasOutstandingLoans?: true;
    outstandingLoanDetails?: true;
    hasDefaulted?: true;
    defaultExplanation?: true;
    _all?: true;
};
export type SmeApplicationDataAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which SmeApplicationData to aggregate.
     */
    where?: Prisma.SmeApplicationDataWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SmeApplicationData to fetch.
     */
    orderBy?: Prisma.SmeApplicationDataOrderByWithRelationInput | Prisma.SmeApplicationDataOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.SmeApplicationDataWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SmeApplicationData from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SmeApplicationData.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned SmeApplicationData
    **/
    _count?: true | SmeApplicationDataCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: SmeApplicationDataAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: SmeApplicationDataSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: SmeApplicationDataMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: SmeApplicationDataMaxAggregateInputType;
};
export type GetSmeApplicationDataAggregateType<T extends SmeApplicationDataAggregateArgs> = {
    [P in keyof T & keyof AggregateSmeApplicationData]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSmeApplicationData[P]> : Prisma.GetScalarType<T[P], AggregateSmeApplicationData[P]>;
};
export type SmeApplicationDataGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SmeApplicationDataWhereInput;
    orderBy?: Prisma.SmeApplicationDataOrderByWithAggregationInput | Prisma.SmeApplicationDataOrderByWithAggregationInput[];
    by: Prisma.SmeApplicationDataScalarFieldEnum[] | Prisma.SmeApplicationDataScalarFieldEnum;
    having?: Prisma.SmeApplicationDataScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SmeApplicationDataCountAggregateInputType | true;
    _avg?: SmeApplicationDataAvgAggregateInputType;
    _sum?: SmeApplicationDataSumAggregateInputType;
    _min?: SmeApplicationDataMinAggregateInputType;
    _max?: SmeApplicationDataMaxAggregateInputType;
};
export type SmeApplicationDataGroupByOutputType = {
    id: string;
    applicationId: string;
    businessName: string;
    registrationNo: string | null;
    businessType: string;
    yearsInOperation: number;
    loanProduct: string;
    loanAmount: number;
    paybackPeriodMonths: number;
    purposeOfLoan: string;
    repaymentMethod: string;
    estimatedMonthlyTurnover: number | null;
    estimatedMonthlyProfit: number | null;
    groupName: string | null;
    groupMemberCount: number | null;
    hasOutstandingLoans: boolean;
    outstandingLoanDetails: string | null;
    hasDefaulted: boolean;
    defaultExplanation: string | null;
    _count: SmeApplicationDataCountAggregateOutputType | null;
    _avg: SmeApplicationDataAvgAggregateOutputType | null;
    _sum: SmeApplicationDataSumAggregateOutputType | null;
    _min: SmeApplicationDataMinAggregateOutputType | null;
    _max: SmeApplicationDataMaxAggregateOutputType | null;
};
type GetSmeApplicationDataGroupByPayload<T extends SmeApplicationDataGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SmeApplicationDataGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SmeApplicationDataGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SmeApplicationDataGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SmeApplicationDataGroupByOutputType[P]>;
}>>;
export type SmeApplicationDataWhereInput = {
    AND?: Prisma.SmeApplicationDataWhereInput | Prisma.SmeApplicationDataWhereInput[];
    OR?: Prisma.SmeApplicationDataWhereInput[];
    NOT?: Prisma.SmeApplicationDataWhereInput | Prisma.SmeApplicationDataWhereInput[];
    id?: Prisma.StringFilter<"SmeApplicationData"> | string;
    applicationId?: Prisma.StringFilter<"SmeApplicationData"> | string;
    businessName?: Prisma.StringFilter<"SmeApplicationData"> | string;
    registrationNo?: Prisma.StringNullableFilter<"SmeApplicationData"> | string | null;
    businessType?: Prisma.StringFilter<"SmeApplicationData"> | string;
    yearsInOperation?: Prisma.IntFilter<"SmeApplicationData"> | number;
    loanProduct?: Prisma.StringFilter<"SmeApplicationData"> | string;
    loanAmount?: Prisma.FloatFilter<"SmeApplicationData"> | number;
    paybackPeriodMonths?: Prisma.IntFilter<"SmeApplicationData"> | number;
    purposeOfLoan?: Prisma.StringFilter<"SmeApplicationData"> | string;
    repaymentMethod?: Prisma.StringFilter<"SmeApplicationData"> | string;
    estimatedMonthlyTurnover?: Prisma.FloatNullableFilter<"SmeApplicationData"> | number | null;
    estimatedMonthlyProfit?: Prisma.FloatNullableFilter<"SmeApplicationData"> | number | null;
    groupName?: Prisma.StringNullableFilter<"SmeApplicationData"> | string | null;
    groupMemberCount?: Prisma.IntNullableFilter<"SmeApplicationData"> | number | null;
    hasOutstandingLoans?: Prisma.BoolFilter<"SmeApplicationData"> | boolean;
    outstandingLoanDetails?: Prisma.StringNullableFilter<"SmeApplicationData"> | string | null;
    hasDefaulted?: Prisma.BoolFilter<"SmeApplicationData"> | boolean;
    defaultExplanation?: Prisma.StringNullableFilter<"SmeApplicationData"> | string | null;
    application?: Prisma.XOR<Prisma.ApplicationScalarRelationFilter, Prisma.ApplicationWhereInput>;
};
export type SmeApplicationDataOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    applicationId?: Prisma.SortOrder;
    businessName?: Prisma.SortOrder;
    registrationNo?: Prisma.SortOrderInput | Prisma.SortOrder;
    businessType?: Prisma.SortOrder;
    yearsInOperation?: Prisma.SortOrder;
    loanProduct?: Prisma.SortOrder;
    loanAmount?: Prisma.SortOrder;
    paybackPeriodMonths?: Prisma.SortOrder;
    purposeOfLoan?: Prisma.SortOrder;
    repaymentMethod?: Prisma.SortOrder;
    estimatedMonthlyTurnover?: Prisma.SortOrderInput | Prisma.SortOrder;
    estimatedMonthlyProfit?: Prisma.SortOrderInput | Prisma.SortOrder;
    groupName?: Prisma.SortOrderInput | Prisma.SortOrder;
    groupMemberCount?: Prisma.SortOrderInput | Prisma.SortOrder;
    hasOutstandingLoans?: Prisma.SortOrder;
    outstandingLoanDetails?: Prisma.SortOrderInput | Prisma.SortOrder;
    hasDefaulted?: Prisma.SortOrder;
    defaultExplanation?: Prisma.SortOrderInput | Prisma.SortOrder;
    application?: Prisma.ApplicationOrderByWithRelationInput;
};
export type SmeApplicationDataWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    applicationId?: string;
    AND?: Prisma.SmeApplicationDataWhereInput | Prisma.SmeApplicationDataWhereInput[];
    OR?: Prisma.SmeApplicationDataWhereInput[];
    NOT?: Prisma.SmeApplicationDataWhereInput | Prisma.SmeApplicationDataWhereInput[];
    businessName?: Prisma.StringFilter<"SmeApplicationData"> | string;
    registrationNo?: Prisma.StringNullableFilter<"SmeApplicationData"> | string | null;
    businessType?: Prisma.StringFilter<"SmeApplicationData"> | string;
    yearsInOperation?: Prisma.IntFilter<"SmeApplicationData"> | number;
    loanProduct?: Prisma.StringFilter<"SmeApplicationData"> | string;
    loanAmount?: Prisma.FloatFilter<"SmeApplicationData"> | number;
    paybackPeriodMonths?: Prisma.IntFilter<"SmeApplicationData"> | number;
    purposeOfLoan?: Prisma.StringFilter<"SmeApplicationData"> | string;
    repaymentMethod?: Prisma.StringFilter<"SmeApplicationData"> | string;
    estimatedMonthlyTurnover?: Prisma.FloatNullableFilter<"SmeApplicationData"> | number | null;
    estimatedMonthlyProfit?: Prisma.FloatNullableFilter<"SmeApplicationData"> | number | null;
    groupName?: Prisma.StringNullableFilter<"SmeApplicationData"> | string | null;
    groupMemberCount?: Prisma.IntNullableFilter<"SmeApplicationData"> | number | null;
    hasOutstandingLoans?: Prisma.BoolFilter<"SmeApplicationData"> | boolean;
    outstandingLoanDetails?: Prisma.StringNullableFilter<"SmeApplicationData"> | string | null;
    hasDefaulted?: Prisma.BoolFilter<"SmeApplicationData"> | boolean;
    defaultExplanation?: Prisma.StringNullableFilter<"SmeApplicationData"> | string | null;
    application?: Prisma.XOR<Prisma.ApplicationScalarRelationFilter, Prisma.ApplicationWhereInput>;
}, "id" | "applicationId">;
export type SmeApplicationDataOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    applicationId?: Prisma.SortOrder;
    businessName?: Prisma.SortOrder;
    registrationNo?: Prisma.SortOrderInput | Prisma.SortOrder;
    businessType?: Prisma.SortOrder;
    yearsInOperation?: Prisma.SortOrder;
    loanProduct?: Prisma.SortOrder;
    loanAmount?: Prisma.SortOrder;
    paybackPeriodMonths?: Prisma.SortOrder;
    purposeOfLoan?: Prisma.SortOrder;
    repaymentMethod?: Prisma.SortOrder;
    estimatedMonthlyTurnover?: Prisma.SortOrderInput | Prisma.SortOrder;
    estimatedMonthlyProfit?: Prisma.SortOrderInput | Prisma.SortOrder;
    groupName?: Prisma.SortOrderInput | Prisma.SortOrder;
    groupMemberCount?: Prisma.SortOrderInput | Prisma.SortOrder;
    hasOutstandingLoans?: Prisma.SortOrder;
    outstandingLoanDetails?: Prisma.SortOrderInput | Prisma.SortOrder;
    hasDefaulted?: Prisma.SortOrder;
    defaultExplanation?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.SmeApplicationDataCountOrderByAggregateInput;
    _avg?: Prisma.SmeApplicationDataAvgOrderByAggregateInput;
    _max?: Prisma.SmeApplicationDataMaxOrderByAggregateInput;
    _min?: Prisma.SmeApplicationDataMinOrderByAggregateInput;
    _sum?: Prisma.SmeApplicationDataSumOrderByAggregateInput;
};
export type SmeApplicationDataScalarWhereWithAggregatesInput = {
    AND?: Prisma.SmeApplicationDataScalarWhereWithAggregatesInput | Prisma.SmeApplicationDataScalarWhereWithAggregatesInput[];
    OR?: Prisma.SmeApplicationDataScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SmeApplicationDataScalarWhereWithAggregatesInput | Prisma.SmeApplicationDataScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"SmeApplicationData"> | string;
    applicationId?: Prisma.StringWithAggregatesFilter<"SmeApplicationData"> | string;
    businessName?: Prisma.StringWithAggregatesFilter<"SmeApplicationData"> | string;
    registrationNo?: Prisma.StringNullableWithAggregatesFilter<"SmeApplicationData"> | string | null;
    businessType?: Prisma.StringWithAggregatesFilter<"SmeApplicationData"> | string;
    yearsInOperation?: Prisma.IntWithAggregatesFilter<"SmeApplicationData"> | number;
    loanProduct?: Prisma.StringWithAggregatesFilter<"SmeApplicationData"> | string;
    loanAmount?: Prisma.FloatWithAggregatesFilter<"SmeApplicationData"> | number;
    paybackPeriodMonths?: Prisma.IntWithAggregatesFilter<"SmeApplicationData"> | number;
    purposeOfLoan?: Prisma.StringWithAggregatesFilter<"SmeApplicationData"> | string;
    repaymentMethod?: Prisma.StringWithAggregatesFilter<"SmeApplicationData"> | string;
    estimatedMonthlyTurnover?: Prisma.FloatNullableWithAggregatesFilter<"SmeApplicationData"> | number | null;
    estimatedMonthlyProfit?: Prisma.FloatNullableWithAggregatesFilter<"SmeApplicationData"> | number | null;
    groupName?: Prisma.StringNullableWithAggregatesFilter<"SmeApplicationData"> | string | null;
    groupMemberCount?: Prisma.IntNullableWithAggregatesFilter<"SmeApplicationData"> | number | null;
    hasOutstandingLoans?: Prisma.BoolWithAggregatesFilter<"SmeApplicationData"> | boolean;
    outstandingLoanDetails?: Prisma.StringNullableWithAggregatesFilter<"SmeApplicationData"> | string | null;
    hasDefaulted?: Prisma.BoolWithAggregatesFilter<"SmeApplicationData"> | boolean;
    defaultExplanation?: Prisma.StringNullableWithAggregatesFilter<"SmeApplicationData"> | string | null;
};
export type SmeApplicationDataCreateInput = {
    id?: string;
    businessName: string;
    registrationNo?: string | null;
    businessType: string;
    yearsInOperation: number;
    loanProduct: string;
    loanAmount: number;
    paybackPeriodMonths: number;
    purposeOfLoan: string;
    repaymentMethod: string;
    estimatedMonthlyTurnover?: number | null;
    estimatedMonthlyProfit?: number | null;
    groupName?: string | null;
    groupMemberCount?: number | null;
    hasOutstandingLoans: boolean;
    outstandingLoanDetails?: string | null;
    hasDefaulted: boolean;
    defaultExplanation?: string | null;
    application: Prisma.ApplicationCreateNestedOneWithoutSmeDataInput;
};
export type SmeApplicationDataUncheckedCreateInput = {
    id?: string;
    applicationId: string;
    businessName: string;
    registrationNo?: string | null;
    businessType: string;
    yearsInOperation: number;
    loanProduct: string;
    loanAmount: number;
    paybackPeriodMonths: number;
    purposeOfLoan: string;
    repaymentMethod: string;
    estimatedMonthlyTurnover?: number | null;
    estimatedMonthlyProfit?: number | null;
    groupName?: string | null;
    groupMemberCount?: number | null;
    hasOutstandingLoans: boolean;
    outstandingLoanDetails?: string | null;
    hasDefaulted: boolean;
    defaultExplanation?: string | null;
};
export type SmeApplicationDataUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    businessName?: Prisma.StringFieldUpdateOperationsInput | string;
    registrationNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessType?: Prisma.StringFieldUpdateOperationsInput | string;
    yearsInOperation?: Prisma.IntFieldUpdateOperationsInput | number;
    loanProduct?: Prisma.StringFieldUpdateOperationsInput | string;
    loanAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    paybackPeriodMonths?: Prisma.IntFieldUpdateOperationsInput | number;
    purposeOfLoan?: Prisma.StringFieldUpdateOperationsInput | string;
    repaymentMethod?: Prisma.StringFieldUpdateOperationsInput | string;
    estimatedMonthlyTurnover?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    estimatedMonthlyProfit?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    groupName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    groupMemberCount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    hasOutstandingLoans?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    outstandingLoanDetails?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hasDefaulted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    defaultExplanation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    application?: Prisma.ApplicationUpdateOneRequiredWithoutSmeDataNestedInput;
};
export type SmeApplicationDataUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    applicationId?: Prisma.StringFieldUpdateOperationsInput | string;
    businessName?: Prisma.StringFieldUpdateOperationsInput | string;
    registrationNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessType?: Prisma.StringFieldUpdateOperationsInput | string;
    yearsInOperation?: Prisma.IntFieldUpdateOperationsInput | number;
    loanProduct?: Prisma.StringFieldUpdateOperationsInput | string;
    loanAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    paybackPeriodMonths?: Prisma.IntFieldUpdateOperationsInput | number;
    purposeOfLoan?: Prisma.StringFieldUpdateOperationsInput | string;
    repaymentMethod?: Prisma.StringFieldUpdateOperationsInput | string;
    estimatedMonthlyTurnover?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    estimatedMonthlyProfit?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    groupName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    groupMemberCount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    hasOutstandingLoans?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    outstandingLoanDetails?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hasDefaulted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    defaultExplanation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type SmeApplicationDataCreateManyInput = {
    id?: string;
    applicationId: string;
    businessName: string;
    registrationNo?: string | null;
    businessType: string;
    yearsInOperation: number;
    loanProduct: string;
    loanAmount: number;
    paybackPeriodMonths: number;
    purposeOfLoan: string;
    repaymentMethod: string;
    estimatedMonthlyTurnover?: number | null;
    estimatedMonthlyProfit?: number | null;
    groupName?: string | null;
    groupMemberCount?: number | null;
    hasOutstandingLoans: boolean;
    outstandingLoanDetails?: string | null;
    hasDefaulted: boolean;
    defaultExplanation?: string | null;
};
export type SmeApplicationDataUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    businessName?: Prisma.StringFieldUpdateOperationsInput | string;
    registrationNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessType?: Prisma.StringFieldUpdateOperationsInput | string;
    yearsInOperation?: Prisma.IntFieldUpdateOperationsInput | number;
    loanProduct?: Prisma.StringFieldUpdateOperationsInput | string;
    loanAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    paybackPeriodMonths?: Prisma.IntFieldUpdateOperationsInput | number;
    purposeOfLoan?: Prisma.StringFieldUpdateOperationsInput | string;
    repaymentMethod?: Prisma.StringFieldUpdateOperationsInput | string;
    estimatedMonthlyTurnover?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    estimatedMonthlyProfit?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    groupName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    groupMemberCount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    hasOutstandingLoans?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    outstandingLoanDetails?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hasDefaulted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    defaultExplanation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type SmeApplicationDataUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    applicationId?: Prisma.StringFieldUpdateOperationsInput | string;
    businessName?: Prisma.StringFieldUpdateOperationsInput | string;
    registrationNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessType?: Prisma.StringFieldUpdateOperationsInput | string;
    yearsInOperation?: Prisma.IntFieldUpdateOperationsInput | number;
    loanProduct?: Prisma.StringFieldUpdateOperationsInput | string;
    loanAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    paybackPeriodMonths?: Prisma.IntFieldUpdateOperationsInput | number;
    purposeOfLoan?: Prisma.StringFieldUpdateOperationsInput | string;
    repaymentMethod?: Prisma.StringFieldUpdateOperationsInput | string;
    estimatedMonthlyTurnover?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    estimatedMonthlyProfit?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    groupName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    groupMemberCount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    hasOutstandingLoans?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    outstandingLoanDetails?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hasDefaulted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    defaultExplanation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type SmeApplicationDataNullableScalarRelationFilter = {
    is?: Prisma.SmeApplicationDataWhereInput | null;
    isNot?: Prisma.SmeApplicationDataWhereInput | null;
};
export type SmeApplicationDataCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    applicationId?: Prisma.SortOrder;
    businessName?: Prisma.SortOrder;
    registrationNo?: Prisma.SortOrder;
    businessType?: Prisma.SortOrder;
    yearsInOperation?: Prisma.SortOrder;
    loanProduct?: Prisma.SortOrder;
    loanAmount?: Prisma.SortOrder;
    paybackPeriodMonths?: Prisma.SortOrder;
    purposeOfLoan?: Prisma.SortOrder;
    repaymentMethod?: Prisma.SortOrder;
    estimatedMonthlyTurnover?: Prisma.SortOrder;
    estimatedMonthlyProfit?: Prisma.SortOrder;
    groupName?: Prisma.SortOrder;
    groupMemberCount?: Prisma.SortOrder;
    hasOutstandingLoans?: Prisma.SortOrder;
    outstandingLoanDetails?: Prisma.SortOrder;
    hasDefaulted?: Prisma.SortOrder;
    defaultExplanation?: Prisma.SortOrder;
};
export type SmeApplicationDataAvgOrderByAggregateInput = {
    yearsInOperation?: Prisma.SortOrder;
    loanAmount?: Prisma.SortOrder;
    paybackPeriodMonths?: Prisma.SortOrder;
    estimatedMonthlyTurnover?: Prisma.SortOrder;
    estimatedMonthlyProfit?: Prisma.SortOrder;
    groupMemberCount?: Prisma.SortOrder;
};
export type SmeApplicationDataMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    applicationId?: Prisma.SortOrder;
    businessName?: Prisma.SortOrder;
    registrationNo?: Prisma.SortOrder;
    businessType?: Prisma.SortOrder;
    yearsInOperation?: Prisma.SortOrder;
    loanProduct?: Prisma.SortOrder;
    loanAmount?: Prisma.SortOrder;
    paybackPeriodMonths?: Prisma.SortOrder;
    purposeOfLoan?: Prisma.SortOrder;
    repaymentMethod?: Prisma.SortOrder;
    estimatedMonthlyTurnover?: Prisma.SortOrder;
    estimatedMonthlyProfit?: Prisma.SortOrder;
    groupName?: Prisma.SortOrder;
    groupMemberCount?: Prisma.SortOrder;
    hasOutstandingLoans?: Prisma.SortOrder;
    outstandingLoanDetails?: Prisma.SortOrder;
    hasDefaulted?: Prisma.SortOrder;
    defaultExplanation?: Prisma.SortOrder;
};
export type SmeApplicationDataMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    applicationId?: Prisma.SortOrder;
    businessName?: Prisma.SortOrder;
    registrationNo?: Prisma.SortOrder;
    businessType?: Prisma.SortOrder;
    yearsInOperation?: Prisma.SortOrder;
    loanProduct?: Prisma.SortOrder;
    loanAmount?: Prisma.SortOrder;
    paybackPeriodMonths?: Prisma.SortOrder;
    purposeOfLoan?: Prisma.SortOrder;
    repaymentMethod?: Prisma.SortOrder;
    estimatedMonthlyTurnover?: Prisma.SortOrder;
    estimatedMonthlyProfit?: Prisma.SortOrder;
    groupName?: Prisma.SortOrder;
    groupMemberCount?: Prisma.SortOrder;
    hasOutstandingLoans?: Prisma.SortOrder;
    outstandingLoanDetails?: Prisma.SortOrder;
    hasDefaulted?: Prisma.SortOrder;
    defaultExplanation?: Prisma.SortOrder;
};
export type SmeApplicationDataSumOrderByAggregateInput = {
    yearsInOperation?: Prisma.SortOrder;
    loanAmount?: Prisma.SortOrder;
    paybackPeriodMonths?: Prisma.SortOrder;
    estimatedMonthlyTurnover?: Prisma.SortOrder;
    estimatedMonthlyProfit?: Prisma.SortOrder;
    groupMemberCount?: Prisma.SortOrder;
};
export type SmeApplicationDataCreateNestedOneWithoutApplicationInput = {
    create?: Prisma.XOR<Prisma.SmeApplicationDataCreateWithoutApplicationInput, Prisma.SmeApplicationDataUncheckedCreateWithoutApplicationInput>;
    connectOrCreate?: Prisma.SmeApplicationDataCreateOrConnectWithoutApplicationInput;
    connect?: Prisma.SmeApplicationDataWhereUniqueInput;
};
export type SmeApplicationDataUncheckedCreateNestedOneWithoutApplicationInput = {
    create?: Prisma.XOR<Prisma.SmeApplicationDataCreateWithoutApplicationInput, Prisma.SmeApplicationDataUncheckedCreateWithoutApplicationInput>;
    connectOrCreate?: Prisma.SmeApplicationDataCreateOrConnectWithoutApplicationInput;
    connect?: Prisma.SmeApplicationDataWhereUniqueInput;
};
export type SmeApplicationDataUpdateOneWithoutApplicationNestedInput = {
    create?: Prisma.XOR<Prisma.SmeApplicationDataCreateWithoutApplicationInput, Prisma.SmeApplicationDataUncheckedCreateWithoutApplicationInput>;
    connectOrCreate?: Prisma.SmeApplicationDataCreateOrConnectWithoutApplicationInput;
    upsert?: Prisma.SmeApplicationDataUpsertWithoutApplicationInput;
    disconnect?: Prisma.SmeApplicationDataWhereInput | boolean;
    delete?: Prisma.SmeApplicationDataWhereInput | boolean;
    connect?: Prisma.SmeApplicationDataWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SmeApplicationDataUpdateToOneWithWhereWithoutApplicationInput, Prisma.SmeApplicationDataUpdateWithoutApplicationInput>, Prisma.SmeApplicationDataUncheckedUpdateWithoutApplicationInput>;
};
export type SmeApplicationDataUncheckedUpdateOneWithoutApplicationNestedInput = {
    create?: Prisma.XOR<Prisma.SmeApplicationDataCreateWithoutApplicationInput, Prisma.SmeApplicationDataUncheckedCreateWithoutApplicationInput>;
    connectOrCreate?: Prisma.SmeApplicationDataCreateOrConnectWithoutApplicationInput;
    upsert?: Prisma.SmeApplicationDataUpsertWithoutApplicationInput;
    disconnect?: Prisma.SmeApplicationDataWhereInput | boolean;
    delete?: Prisma.SmeApplicationDataWhereInput | boolean;
    connect?: Prisma.SmeApplicationDataWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SmeApplicationDataUpdateToOneWithWhereWithoutApplicationInput, Prisma.SmeApplicationDataUpdateWithoutApplicationInput>, Prisma.SmeApplicationDataUncheckedUpdateWithoutApplicationInput>;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type FloatFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type SmeApplicationDataCreateWithoutApplicationInput = {
    id?: string;
    businessName: string;
    registrationNo?: string | null;
    businessType: string;
    yearsInOperation: number;
    loanProduct: string;
    loanAmount: number;
    paybackPeriodMonths: number;
    purposeOfLoan: string;
    repaymentMethod: string;
    estimatedMonthlyTurnover?: number | null;
    estimatedMonthlyProfit?: number | null;
    groupName?: string | null;
    groupMemberCount?: number | null;
    hasOutstandingLoans: boolean;
    outstandingLoanDetails?: string | null;
    hasDefaulted: boolean;
    defaultExplanation?: string | null;
};
export type SmeApplicationDataUncheckedCreateWithoutApplicationInput = {
    id?: string;
    businessName: string;
    registrationNo?: string | null;
    businessType: string;
    yearsInOperation: number;
    loanProduct: string;
    loanAmount: number;
    paybackPeriodMonths: number;
    purposeOfLoan: string;
    repaymentMethod: string;
    estimatedMonthlyTurnover?: number | null;
    estimatedMonthlyProfit?: number | null;
    groupName?: string | null;
    groupMemberCount?: number | null;
    hasOutstandingLoans: boolean;
    outstandingLoanDetails?: string | null;
    hasDefaulted: boolean;
    defaultExplanation?: string | null;
};
export type SmeApplicationDataCreateOrConnectWithoutApplicationInput = {
    where: Prisma.SmeApplicationDataWhereUniqueInput;
    create: Prisma.XOR<Prisma.SmeApplicationDataCreateWithoutApplicationInput, Prisma.SmeApplicationDataUncheckedCreateWithoutApplicationInput>;
};
export type SmeApplicationDataUpsertWithoutApplicationInput = {
    update: Prisma.XOR<Prisma.SmeApplicationDataUpdateWithoutApplicationInput, Prisma.SmeApplicationDataUncheckedUpdateWithoutApplicationInput>;
    create: Prisma.XOR<Prisma.SmeApplicationDataCreateWithoutApplicationInput, Prisma.SmeApplicationDataUncheckedCreateWithoutApplicationInput>;
    where?: Prisma.SmeApplicationDataWhereInput;
};
export type SmeApplicationDataUpdateToOneWithWhereWithoutApplicationInput = {
    where?: Prisma.SmeApplicationDataWhereInput;
    data: Prisma.XOR<Prisma.SmeApplicationDataUpdateWithoutApplicationInput, Prisma.SmeApplicationDataUncheckedUpdateWithoutApplicationInput>;
};
export type SmeApplicationDataUpdateWithoutApplicationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    businessName?: Prisma.StringFieldUpdateOperationsInput | string;
    registrationNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessType?: Prisma.StringFieldUpdateOperationsInput | string;
    yearsInOperation?: Prisma.IntFieldUpdateOperationsInput | number;
    loanProduct?: Prisma.StringFieldUpdateOperationsInput | string;
    loanAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    paybackPeriodMonths?: Prisma.IntFieldUpdateOperationsInput | number;
    purposeOfLoan?: Prisma.StringFieldUpdateOperationsInput | string;
    repaymentMethod?: Prisma.StringFieldUpdateOperationsInput | string;
    estimatedMonthlyTurnover?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    estimatedMonthlyProfit?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    groupName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    groupMemberCount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    hasOutstandingLoans?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    outstandingLoanDetails?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hasDefaulted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    defaultExplanation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type SmeApplicationDataUncheckedUpdateWithoutApplicationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    businessName?: Prisma.StringFieldUpdateOperationsInput | string;
    registrationNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessType?: Prisma.StringFieldUpdateOperationsInput | string;
    yearsInOperation?: Prisma.IntFieldUpdateOperationsInput | number;
    loanProduct?: Prisma.StringFieldUpdateOperationsInput | string;
    loanAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    paybackPeriodMonths?: Prisma.IntFieldUpdateOperationsInput | number;
    purposeOfLoan?: Prisma.StringFieldUpdateOperationsInput | string;
    repaymentMethod?: Prisma.StringFieldUpdateOperationsInput | string;
    estimatedMonthlyTurnover?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    estimatedMonthlyProfit?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    groupName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    groupMemberCount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    hasOutstandingLoans?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    outstandingLoanDetails?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hasDefaulted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    defaultExplanation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type SmeApplicationDataSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    applicationId?: boolean;
    businessName?: boolean;
    registrationNo?: boolean;
    businessType?: boolean;
    yearsInOperation?: boolean;
    loanProduct?: boolean;
    loanAmount?: boolean;
    paybackPeriodMonths?: boolean;
    purposeOfLoan?: boolean;
    repaymentMethod?: boolean;
    estimatedMonthlyTurnover?: boolean;
    estimatedMonthlyProfit?: boolean;
    groupName?: boolean;
    groupMemberCount?: boolean;
    hasOutstandingLoans?: boolean;
    outstandingLoanDetails?: boolean;
    hasDefaulted?: boolean;
    defaultExplanation?: boolean;
    application?: boolean | Prisma.ApplicationDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["smeApplicationData"]>;
export type SmeApplicationDataSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    applicationId?: boolean;
    businessName?: boolean;
    registrationNo?: boolean;
    businessType?: boolean;
    yearsInOperation?: boolean;
    loanProduct?: boolean;
    loanAmount?: boolean;
    paybackPeriodMonths?: boolean;
    purposeOfLoan?: boolean;
    repaymentMethod?: boolean;
    estimatedMonthlyTurnover?: boolean;
    estimatedMonthlyProfit?: boolean;
    groupName?: boolean;
    groupMemberCount?: boolean;
    hasOutstandingLoans?: boolean;
    outstandingLoanDetails?: boolean;
    hasDefaulted?: boolean;
    defaultExplanation?: boolean;
    application?: boolean | Prisma.ApplicationDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["smeApplicationData"]>;
export type SmeApplicationDataSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    applicationId?: boolean;
    businessName?: boolean;
    registrationNo?: boolean;
    businessType?: boolean;
    yearsInOperation?: boolean;
    loanProduct?: boolean;
    loanAmount?: boolean;
    paybackPeriodMonths?: boolean;
    purposeOfLoan?: boolean;
    repaymentMethod?: boolean;
    estimatedMonthlyTurnover?: boolean;
    estimatedMonthlyProfit?: boolean;
    groupName?: boolean;
    groupMemberCount?: boolean;
    hasOutstandingLoans?: boolean;
    outstandingLoanDetails?: boolean;
    hasDefaulted?: boolean;
    defaultExplanation?: boolean;
    application?: boolean | Prisma.ApplicationDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["smeApplicationData"]>;
export type SmeApplicationDataSelectScalar = {
    id?: boolean;
    applicationId?: boolean;
    businessName?: boolean;
    registrationNo?: boolean;
    businessType?: boolean;
    yearsInOperation?: boolean;
    loanProduct?: boolean;
    loanAmount?: boolean;
    paybackPeriodMonths?: boolean;
    purposeOfLoan?: boolean;
    repaymentMethod?: boolean;
    estimatedMonthlyTurnover?: boolean;
    estimatedMonthlyProfit?: boolean;
    groupName?: boolean;
    groupMemberCount?: boolean;
    hasOutstandingLoans?: boolean;
    outstandingLoanDetails?: boolean;
    hasDefaulted?: boolean;
    defaultExplanation?: boolean;
};
export type SmeApplicationDataOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "applicationId" | "businessName" | "registrationNo" | "businessType" | "yearsInOperation" | "loanProduct" | "loanAmount" | "paybackPeriodMonths" | "purposeOfLoan" | "repaymentMethod" | "estimatedMonthlyTurnover" | "estimatedMonthlyProfit" | "groupName" | "groupMemberCount" | "hasOutstandingLoans" | "outstandingLoanDetails" | "hasDefaulted" | "defaultExplanation", ExtArgs["result"]["smeApplicationData"]>;
export type SmeApplicationDataInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    application?: boolean | Prisma.ApplicationDefaultArgs<ExtArgs>;
};
export type SmeApplicationDataIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    application?: boolean | Prisma.ApplicationDefaultArgs<ExtArgs>;
};
export type SmeApplicationDataIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    application?: boolean | Prisma.ApplicationDefaultArgs<ExtArgs>;
};
export type $SmeApplicationDataPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "SmeApplicationData";
    objects: {
        application: Prisma.$ApplicationPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        applicationId: string;
        businessName: string;
        registrationNo: string | null;
        businessType: string;
        yearsInOperation: number;
        loanProduct: string;
        loanAmount: number;
        paybackPeriodMonths: number;
        purposeOfLoan: string;
        repaymentMethod: string;
        estimatedMonthlyTurnover: number | null;
        estimatedMonthlyProfit: number | null;
        groupName: string | null;
        groupMemberCount: number | null;
        hasOutstandingLoans: boolean;
        outstandingLoanDetails: string | null;
        hasDefaulted: boolean;
        defaultExplanation: string | null;
    }, ExtArgs["result"]["smeApplicationData"]>;
    composites: {};
};
export type SmeApplicationDataGetPayload<S extends boolean | null | undefined | SmeApplicationDataDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SmeApplicationDataPayload, S>;
export type SmeApplicationDataCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SmeApplicationDataFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SmeApplicationDataCountAggregateInputType | true;
};
export interface SmeApplicationDataDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['SmeApplicationData'];
        meta: {
            name: 'SmeApplicationData';
        };
    };
    /**
     * Find zero or one SmeApplicationData that matches the filter.
     * @param {SmeApplicationDataFindUniqueArgs} args - Arguments to find a SmeApplicationData
     * @example
     * // Get one SmeApplicationData
     * const smeApplicationData = await prisma.smeApplicationData.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SmeApplicationDataFindUniqueArgs>(args: Prisma.SelectSubset<T, SmeApplicationDataFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SmeApplicationDataClient<runtime.Types.Result.GetResult<Prisma.$SmeApplicationDataPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one SmeApplicationData that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SmeApplicationDataFindUniqueOrThrowArgs} args - Arguments to find a SmeApplicationData
     * @example
     * // Get one SmeApplicationData
     * const smeApplicationData = await prisma.smeApplicationData.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SmeApplicationDataFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SmeApplicationDataFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SmeApplicationDataClient<runtime.Types.Result.GetResult<Prisma.$SmeApplicationDataPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first SmeApplicationData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SmeApplicationDataFindFirstArgs} args - Arguments to find a SmeApplicationData
     * @example
     * // Get one SmeApplicationData
     * const smeApplicationData = await prisma.smeApplicationData.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SmeApplicationDataFindFirstArgs>(args?: Prisma.SelectSubset<T, SmeApplicationDataFindFirstArgs<ExtArgs>>): Prisma.Prisma__SmeApplicationDataClient<runtime.Types.Result.GetResult<Prisma.$SmeApplicationDataPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first SmeApplicationData that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SmeApplicationDataFindFirstOrThrowArgs} args - Arguments to find a SmeApplicationData
     * @example
     * // Get one SmeApplicationData
     * const smeApplicationData = await prisma.smeApplicationData.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SmeApplicationDataFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SmeApplicationDataFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SmeApplicationDataClient<runtime.Types.Result.GetResult<Prisma.$SmeApplicationDataPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more SmeApplicationData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SmeApplicationDataFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SmeApplicationData
     * const smeApplicationData = await prisma.smeApplicationData.findMany()
     *
     * // Get first 10 SmeApplicationData
     * const smeApplicationData = await prisma.smeApplicationData.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const smeApplicationDataWithIdOnly = await prisma.smeApplicationData.findMany({ select: { id: true } })
     *
     */
    findMany<T extends SmeApplicationDataFindManyArgs>(args?: Prisma.SelectSubset<T, SmeApplicationDataFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SmeApplicationDataPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a SmeApplicationData.
     * @param {SmeApplicationDataCreateArgs} args - Arguments to create a SmeApplicationData.
     * @example
     * // Create one SmeApplicationData
     * const SmeApplicationData = await prisma.smeApplicationData.create({
     *   data: {
     *     // ... data to create a SmeApplicationData
     *   }
     * })
     *
     */
    create<T extends SmeApplicationDataCreateArgs>(args: Prisma.SelectSubset<T, SmeApplicationDataCreateArgs<ExtArgs>>): Prisma.Prisma__SmeApplicationDataClient<runtime.Types.Result.GetResult<Prisma.$SmeApplicationDataPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many SmeApplicationData.
     * @param {SmeApplicationDataCreateManyArgs} args - Arguments to create many SmeApplicationData.
     * @example
     * // Create many SmeApplicationData
     * const smeApplicationData = await prisma.smeApplicationData.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends SmeApplicationDataCreateManyArgs>(args?: Prisma.SelectSubset<T, SmeApplicationDataCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many SmeApplicationData and returns the data saved in the database.
     * @param {SmeApplicationDataCreateManyAndReturnArgs} args - Arguments to create many SmeApplicationData.
     * @example
     * // Create many SmeApplicationData
     * const smeApplicationData = await prisma.smeApplicationData.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many SmeApplicationData and only return the `id`
     * const smeApplicationDataWithIdOnly = await prisma.smeApplicationData.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends SmeApplicationDataCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SmeApplicationDataCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SmeApplicationDataPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a SmeApplicationData.
     * @param {SmeApplicationDataDeleteArgs} args - Arguments to delete one SmeApplicationData.
     * @example
     * // Delete one SmeApplicationData
     * const SmeApplicationData = await prisma.smeApplicationData.delete({
     *   where: {
     *     // ... filter to delete one SmeApplicationData
     *   }
     * })
     *
     */
    delete<T extends SmeApplicationDataDeleteArgs>(args: Prisma.SelectSubset<T, SmeApplicationDataDeleteArgs<ExtArgs>>): Prisma.Prisma__SmeApplicationDataClient<runtime.Types.Result.GetResult<Prisma.$SmeApplicationDataPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one SmeApplicationData.
     * @param {SmeApplicationDataUpdateArgs} args - Arguments to update one SmeApplicationData.
     * @example
     * // Update one SmeApplicationData
     * const smeApplicationData = await prisma.smeApplicationData.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends SmeApplicationDataUpdateArgs>(args: Prisma.SelectSubset<T, SmeApplicationDataUpdateArgs<ExtArgs>>): Prisma.Prisma__SmeApplicationDataClient<runtime.Types.Result.GetResult<Prisma.$SmeApplicationDataPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more SmeApplicationData.
     * @param {SmeApplicationDataDeleteManyArgs} args - Arguments to filter SmeApplicationData to delete.
     * @example
     * // Delete a few SmeApplicationData
     * const { count } = await prisma.smeApplicationData.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends SmeApplicationDataDeleteManyArgs>(args?: Prisma.SelectSubset<T, SmeApplicationDataDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more SmeApplicationData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SmeApplicationDataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SmeApplicationData
     * const smeApplicationData = await prisma.smeApplicationData.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends SmeApplicationDataUpdateManyArgs>(args: Prisma.SelectSubset<T, SmeApplicationDataUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more SmeApplicationData and returns the data updated in the database.
     * @param {SmeApplicationDataUpdateManyAndReturnArgs} args - Arguments to update many SmeApplicationData.
     * @example
     * // Update many SmeApplicationData
     * const smeApplicationData = await prisma.smeApplicationData.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more SmeApplicationData and only return the `id`
     * const smeApplicationDataWithIdOnly = await prisma.smeApplicationData.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends SmeApplicationDataUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SmeApplicationDataUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SmeApplicationDataPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one SmeApplicationData.
     * @param {SmeApplicationDataUpsertArgs} args - Arguments to update or create a SmeApplicationData.
     * @example
     * // Update or create a SmeApplicationData
     * const smeApplicationData = await prisma.smeApplicationData.upsert({
     *   create: {
     *     // ... data to create a SmeApplicationData
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SmeApplicationData we want to update
     *   }
     * })
     */
    upsert<T extends SmeApplicationDataUpsertArgs>(args: Prisma.SelectSubset<T, SmeApplicationDataUpsertArgs<ExtArgs>>): Prisma.Prisma__SmeApplicationDataClient<runtime.Types.Result.GetResult<Prisma.$SmeApplicationDataPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of SmeApplicationData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SmeApplicationDataCountArgs} args - Arguments to filter SmeApplicationData to count.
     * @example
     * // Count the number of SmeApplicationData
     * const count = await prisma.smeApplicationData.count({
     *   where: {
     *     // ... the filter for the SmeApplicationData we want to count
     *   }
     * })
    **/
    count<T extends SmeApplicationDataCountArgs>(args?: Prisma.Subset<T, SmeApplicationDataCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SmeApplicationDataCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a SmeApplicationData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SmeApplicationDataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SmeApplicationDataAggregateArgs>(args: Prisma.Subset<T, SmeApplicationDataAggregateArgs>): Prisma.PrismaPromise<GetSmeApplicationDataAggregateType<T>>;
    /**
     * Group by SmeApplicationData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SmeApplicationDataGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends SmeApplicationDataGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SmeApplicationDataGroupByArgs['orderBy'];
    } : {
        orderBy?: SmeApplicationDataGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SmeApplicationDataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSmeApplicationDataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the SmeApplicationData model
     */
    readonly fields: SmeApplicationDataFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for SmeApplicationData.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__SmeApplicationDataClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    application<T extends Prisma.ApplicationDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ApplicationDefaultArgs<ExtArgs>>): Prisma.Prisma__ApplicationClient<runtime.Types.Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the SmeApplicationData model
 */
export interface SmeApplicationDataFieldRefs {
    readonly id: Prisma.FieldRef<"SmeApplicationData", 'String'>;
    readonly applicationId: Prisma.FieldRef<"SmeApplicationData", 'String'>;
    readonly businessName: Prisma.FieldRef<"SmeApplicationData", 'String'>;
    readonly registrationNo: Prisma.FieldRef<"SmeApplicationData", 'String'>;
    readonly businessType: Prisma.FieldRef<"SmeApplicationData", 'String'>;
    readonly yearsInOperation: Prisma.FieldRef<"SmeApplicationData", 'Int'>;
    readonly loanProduct: Prisma.FieldRef<"SmeApplicationData", 'String'>;
    readonly loanAmount: Prisma.FieldRef<"SmeApplicationData", 'Float'>;
    readonly paybackPeriodMonths: Prisma.FieldRef<"SmeApplicationData", 'Int'>;
    readonly purposeOfLoan: Prisma.FieldRef<"SmeApplicationData", 'String'>;
    readonly repaymentMethod: Prisma.FieldRef<"SmeApplicationData", 'String'>;
    readonly estimatedMonthlyTurnover: Prisma.FieldRef<"SmeApplicationData", 'Float'>;
    readonly estimatedMonthlyProfit: Prisma.FieldRef<"SmeApplicationData", 'Float'>;
    readonly groupName: Prisma.FieldRef<"SmeApplicationData", 'String'>;
    readonly groupMemberCount: Prisma.FieldRef<"SmeApplicationData", 'Int'>;
    readonly hasOutstandingLoans: Prisma.FieldRef<"SmeApplicationData", 'Boolean'>;
    readonly outstandingLoanDetails: Prisma.FieldRef<"SmeApplicationData", 'String'>;
    readonly hasDefaulted: Prisma.FieldRef<"SmeApplicationData", 'Boolean'>;
    readonly defaultExplanation: Prisma.FieldRef<"SmeApplicationData", 'String'>;
}
/**
 * SmeApplicationData findUnique
 */
export type SmeApplicationDataFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SmeApplicationData
     */
    select?: Prisma.SmeApplicationDataSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SmeApplicationData
     */
    omit?: Prisma.SmeApplicationDataOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SmeApplicationDataInclude<ExtArgs> | null;
    /**
     * Filter, which SmeApplicationData to fetch.
     */
    where: Prisma.SmeApplicationDataWhereUniqueInput;
};
/**
 * SmeApplicationData findUniqueOrThrow
 */
export type SmeApplicationDataFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SmeApplicationData
     */
    select?: Prisma.SmeApplicationDataSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SmeApplicationData
     */
    omit?: Prisma.SmeApplicationDataOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SmeApplicationDataInclude<ExtArgs> | null;
    /**
     * Filter, which SmeApplicationData to fetch.
     */
    where: Prisma.SmeApplicationDataWhereUniqueInput;
};
/**
 * SmeApplicationData findFirst
 */
export type SmeApplicationDataFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SmeApplicationData
     */
    select?: Prisma.SmeApplicationDataSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SmeApplicationData
     */
    omit?: Prisma.SmeApplicationDataOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SmeApplicationDataInclude<ExtArgs> | null;
    /**
     * Filter, which SmeApplicationData to fetch.
     */
    where?: Prisma.SmeApplicationDataWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SmeApplicationData to fetch.
     */
    orderBy?: Prisma.SmeApplicationDataOrderByWithRelationInput | Prisma.SmeApplicationDataOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for SmeApplicationData.
     */
    cursor?: Prisma.SmeApplicationDataWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SmeApplicationData from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SmeApplicationData.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of SmeApplicationData.
     */
    distinct?: Prisma.SmeApplicationDataScalarFieldEnum | Prisma.SmeApplicationDataScalarFieldEnum[];
};
/**
 * SmeApplicationData findFirstOrThrow
 */
export type SmeApplicationDataFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SmeApplicationData
     */
    select?: Prisma.SmeApplicationDataSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SmeApplicationData
     */
    omit?: Prisma.SmeApplicationDataOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SmeApplicationDataInclude<ExtArgs> | null;
    /**
     * Filter, which SmeApplicationData to fetch.
     */
    where?: Prisma.SmeApplicationDataWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SmeApplicationData to fetch.
     */
    orderBy?: Prisma.SmeApplicationDataOrderByWithRelationInput | Prisma.SmeApplicationDataOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for SmeApplicationData.
     */
    cursor?: Prisma.SmeApplicationDataWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SmeApplicationData from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SmeApplicationData.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of SmeApplicationData.
     */
    distinct?: Prisma.SmeApplicationDataScalarFieldEnum | Prisma.SmeApplicationDataScalarFieldEnum[];
};
/**
 * SmeApplicationData findMany
 */
export type SmeApplicationDataFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SmeApplicationData
     */
    select?: Prisma.SmeApplicationDataSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SmeApplicationData
     */
    omit?: Prisma.SmeApplicationDataOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SmeApplicationDataInclude<ExtArgs> | null;
    /**
     * Filter, which SmeApplicationData to fetch.
     */
    where?: Prisma.SmeApplicationDataWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SmeApplicationData to fetch.
     */
    orderBy?: Prisma.SmeApplicationDataOrderByWithRelationInput | Prisma.SmeApplicationDataOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing SmeApplicationData.
     */
    cursor?: Prisma.SmeApplicationDataWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SmeApplicationData from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SmeApplicationData.
     */
    skip?: number;
    distinct?: Prisma.SmeApplicationDataScalarFieldEnum | Prisma.SmeApplicationDataScalarFieldEnum[];
};
/**
 * SmeApplicationData create
 */
export type SmeApplicationDataCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SmeApplicationData
     */
    select?: Prisma.SmeApplicationDataSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SmeApplicationData
     */
    omit?: Prisma.SmeApplicationDataOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SmeApplicationDataInclude<ExtArgs> | null;
    /**
     * The data needed to create a SmeApplicationData.
     */
    data: Prisma.XOR<Prisma.SmeApplicationDataCreateInput, Prisma.SmeApplicationDataUncheckedCreateInput>;
};
/**
 * SmeApplicationData createMany
 */
export type SmeApplicationDataCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many SmeApplicationData.
     */
    data: Prisma.SmeApplicationDataCreateManyInput | Prisma.SmeApplicationDataCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * SmeApplicationData createManyAndReturn
 */
export type SmeApplicationDataCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SmeApplicationData
     */
    select?: Prisma.SmeApplicationDataSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the SmeApplicationData
     */
    omit?: Prisma.SmeApplicationDataOmit<ExtArgs> | null;
    /**
     * The data used to create many SmeApplicationData.
     */
    data: Prisma.SmeApplicationDataCreateManyInput | Prisma.SmeApplicationDataCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SmeApplicationDataIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * SmeApplicationData update
 */
export type SmeApplicationDataUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SmeApplicationData
     */
    select?: Prisma.SmeApplicationDataSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SmeApplicationData
     */
    omit?: Prisma.SmeApplicationDataOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SmeApplicationDataInclude<ExtArgs> | null;
    /**
     * The data needed to update a SmeApplicationData.
     */
    data: Prisma.XOR<Prisma.SmeApplicationDataUpdateInput, Prisma.SmeApplicationDataUncheckedUpdateInput>;
    /**
     * Choose, which SmeApplicationData to update.
     */
    where: Prisma.SmeApplicationDataWhereUniqueInput;
};
/**
 * SmeApplicationData updateMany
 */
export type SmeApplicationDataUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update SmeApplicationData.
     */
    data: Prisma.XOR<Prisma.SmeApplicationDataUpdateManyMutationInput, Prisma.SmeApplicationDataUncheckedUpdateManyInput>;
    /**
     * Filter which SmeApplicationData to update
     */
    where?: Prisma.SmeApplicationDataWhereInput;
    /**
     * Limit how many SmeApplicationData to update.
     */
    limit?: number;
};
/**
 * SmeApplicationData updateManyAndReturn
 */
export type SmeApplicationDataUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SmeApplicationData
     */
    select?: Prisma.SmeApplicationDataSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the SmeApplicationData
     */
    omit?: Prisma.SmeApplicationDataOmit<ExtArgs> | null;
    /**
     * The data used to update SmeApplicationData.
     */
    data: Prisma.XOR<Prisma.SmeApplicationDataUpdateManyMutationInput, Prisma.SmeApplicationDataUncheckedUpdateManyInput>;
    /**
     * Filter which SmeApplicationData to update
     */
    where?: Prisma.SmeApplicationDataWhereInput;
    /**
     * Limit how many SmeApplicationData to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SmeApplicationDataIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * SmeApplicationData upsert
 */
export type SmeApplicationDataUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SmeApplicationData
     */
    select?: Prisma.SmeApplicationDataSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SmeApplicationData
     */
    omit?: Prisma.SmeApplicationDataOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SmeApplicationDataInclude<ExtArgs> | null;
    /**
     * The filter to search for the SmeApplicationData to update in case it exists.
     */
    where: Prisma.SmeApplicationDataWhereUniqueInput;
    /**
     * In case the SmeApplicationData found by the `where` argument doesn't exist, create a new SmeApplicationData with this data.
     */
    create: Prisma.XOR<Prisma.SmeApplicationDataCreateInput, Prisma.SmeApplicationDataUncheckedCreateInput>;
    /**
     * In case the SmeApplicationData was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.SmeApplicationDataUpdateInput, Prisma.SmeApplicationDataUncheckedUpdateInput>;
};
/**
 * SmeApplicationData delete
 */
export type SmeApplicationDataDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SmeApplicationData
     */
    select?: Prisma.SmeApplicationDataSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SmeApplicationData
     */
    omit?: Prisma.SmeApplicationDataOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SmeApplicationDataInclude<ExtArgs> | null;
    /**
     * Filter which SmeApplicationData to delete.
     */
    where: Prisma.SmeApplicationDataWhereUniqueInput;
};
/**
 * SmeApplicationData deleteMany
 */
export type SmeApplicationDataDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which SmeApplicationData to delete
     */
    where?: Prisma.SmeApplicationDataWhereInput;
    /**
     * Limit how many SmeApplicationData to delete.
     */
    limit?: number;
};
/**
 * SmeApplicationData without action
 */
export type SmeApplicationDataDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SmeApplicationData
     */
    select?: Prisma.SmeApplicationDataSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SmeApplicationData
     */
    omit?: Prisma.SmeApplicationDataOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SmeApplicationDataInclude<ExtArgs> | null;
};
export {};
