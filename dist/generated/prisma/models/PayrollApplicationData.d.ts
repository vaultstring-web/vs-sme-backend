import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model PayrollApplicationData
 *
 */
export type PayrollApplicationDataModel = runtime.Types.Result.DefaultSelection<Prisma.$PayrollApplicationDataPayload>;
export type AggregatePayrollApplicationData = {
    _count: PayrollApplicationDataCountAggregateOutputType | null;
    _avg: PayrollApplicationDataAvgAggregateOutputType | null;
    _sum: PayrollApplicationDataSumAggregateOutputType | null;
    _min: PayrollApplicationDataMinAggregateOutputType | null;
    _max: PayrollApplicationDataMaxAggregateOutputType | null;
};
export type PayrollApplicationDataAvgAggregateOutputType = {
    loanAmount: number | null;
    paybackPeriodMonths: number | null;
    grossMonthlySalary: number | null;
    netMonthlySalary: number | null;
};
export type PayrollApplicationDataSumAggregateOutputType = {
    loanAmount: number | null;
    paybackPeriodMonths: number | null;
    grossMonthlySalary: number | null;
    netMonthlySalary: number | null;
};
export type PayrollApplicationDataMinAggregateOutputType = {
    id: string | null;
    applicationId: string | null;
    dateOfBirth: Date | null;
    gender: string | null;
    maritalStatus: string | null;
    nextOfKinName: string | null;
    nextOfKinRelationship: string | null;
    nextOfKinPhone: string | null;
    loanAmount: number | null;
    paybackPeriodMonths: number | null;
    employerName: string | null;
    employerAddress: string | null;
    jobTitle: string | null;
    employeeNumber: string | null;
    dateOfEmployment: Date | null;
    grossMonthlySalary: number | null;
    netMonthlySalary: number | null;
    payrollDeductionConfirmed: boolean | null;
    hasOutstandingLoans: boolean | null;
    outstandingLoanDetails: string | null;
    hasDefaulted: boolean | null;
    defaultExplanation: string | null;
};
export type PayrollApplicationDataMaxAggregateOutputType = {
    id: string | null;
    applicationId: string | null;
    dateOfBirth: Date | null;
    gender: string | null;
    maritalStatus: string | null;
    nextOfKinName: string | null;
    nextOfKinRelationship: string | null;
    nextOfKinPhone: string | null;
    loanAmount: number | null;
    paybackPeriodMonths: number | null;
    employerName: string | null;
    employerAddress: string | null;
    jobTitle: string | null;
    employeeNumber: string | null;
    dateOfEmployment: Date | null;
    grossMonthlySalary: number | null;
    netMonthlySalary: number | null;
    payrollDeductionConfirmed: boolean | null;
    hasOutstandingLoans: boolean | null;
    outstandingLoanDetails: string | null;
    hasDefaulted: boolean | null;
    defaultExplanation: string | null;
};
export type PayrollApplicationDataCountAggregateOutputType = {
    id: number;
    applicationId: number;
    dateOfBirth: number;
    gender: number;
    maritalStatus: number;
    nextOfKinName: number;
    nextOfKinRelationship: number;
    nextOfKinPhone: number;
    loanAmount: number;
    paybackPeriodMonths: number;
    employerName: number;
    employerAddress: number;
    jobTitle: number;
    employeeNumber: number;
    dateOfEmployment: number;
    grossMonthlySalary: number;
    netMonthlySalary: number;
    payrollDeductionConfirmed: number;
    hasOutstandingLoans: number;
    outstandingLoanDetails: number;
    hasDefaulted: number;
    defaultExplanation: number;
    _all: number;
};
export type PayrollApplicationDataAvgAggregateInputType = {
    loanAmount?: true;
    paybackPeriodMonths?: true;
    grossMonthlySalary?: true;
    netMonthlySalary?: true;
};
export type PayrollApplicationDataSumAggregateInputType = {
    loanAmount?: true;
    paybackPeriodMonths?: true;
    grossMonthlySalary?: true;
    netMonthlySalary?: true;
};
export type PayrollApplicationDataMinAggregateInputType = {
    id?: true;
    applicationId?: true;
    dateOfBirth?: true;
    gender?: true;
    maritalStatus?: true;
    nextOfKinName?: true;
    nextOfKinRelationship?: true;
    nextOfKinPhone?: true;
    loanAmount?: true;
    paybackPeriodMonths?: true;
    employerName?: true;
    employerAddress?: true;
    jobTitle?: true;
    employeeNumber?: true;
    dateOfEmployment?: true;
    grossMonthlySalary?: true;
    netMonthlySalary?: true;
    payrollDeductionConfirmed?: true;
    hasOutstandingLoans?: true;
    outstandingLoanDetails?: true;
    hasDefaulted?: true;
    defaultExplanation?: true;
};
export type PayrollApplicationDataMaxAggregateInputType = {
    id?: true;
    applicationId?: true;
    dateOfBirth?: true;
    gender?: true;
    maritalStatus?: true;
    nextOfKinName?: true;
    nextOfKinRelationship?: true;
    nextOfKinPhone?: true;
    loanAmount?: true;
    paybackPeriodMonths?: true;
    employerName?: true;
    employerAddress?: true;
    jobTitle?: true;
    employeeNumber?: true;
    dateOfEmployment?: true;
    grossMonthlySalary?: true;
    netMonthlySalary?: true;
    payrollDeductionConfirmed?: true;
    hasOutstandingLoans?: true;
    outstandingLoanDetails?: true;
    hasDefaulted?: true;
    defaultExplanation?: true;
};
export type PayrollApplicationDataCountAggregateInputType = {
    id?: true;
    applicationId?: true;
    dateOfBirth?: true;
    gender?: true;
    maritalStatus?: true;
    nextOfKinName?: true;
    nextOfKinRelationship?: true;
    nextOfKinPhone?: true;
    loanAmount?: true;
    paybackPeriodMonths?: true;
    employerName?: true;
    employerAddress?: true;
    jobTitle?: true;
    employeeNumber?: true;
    dateOfEmployment?: true;
    grossMonthlySalary?: true;
    netMonthlySalary?: true;
    payrollDeductionConfirmed?: true;
    hasOutstandingLoans?: true;
    outstandingLoanDetails?: true;
    hasDefaulted?: true;
    defaultExplanation?: true;
    _all?: true;
};
export type PayrollApplicationDataAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which PayrollApplicationData to aggregate.
     */
    where?: Prisma.PayrollApplicationDataWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PayrollApplicationData to fetch.
     */
    orderBy?: Prisma.PayrollApplicationDataOrderByWithRelationInput | Prisma.PayrollApplicationDataOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.PayrollApplicationDataWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PayrollApplicationData from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PayrollApplicationData.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned PayrollApplicationData
    **/
    _count?: true | PayrollApplicationDataCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: PayrollApplicationDataAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: PayrollApplicationDataSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: PayrollApplicationDataMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: PayrollApplicationDataMaxAggregateInputType;
};
export type GetPayrollApplicationDataAggregateType<T extends PayrollApplicationDataAggregateArgs> = {
    [P in keyof T & keyof AggregatePayrollApplicationData]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePayrollApplicationData[P]> : Prisma.GetScalarType<T[P], AggregatePayrollApplicationData[P]>;
};
export type PayrollApplicationDataGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PayrollApplicationDataWhereInput;
    orderBy?: Prisma.PayrollApplicationDataOrderByWithAggregationInput | Prisma.PayrollApplicationDataOrderByWithAggregationInput[];
    by: Prisma.PayrollApplicationDataScalarFieldEnum[] | Prisma.PayrollApplicationDataScalarFieldEnum;
    having?: Prisma.PayrollApplicationDataScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PayrollApplicationDataCountAggregateInputType | true;
    _avg?: PayrollApplicationDataAvgAggregateInputType;
    _sum?: PayrollApplicationDataSumAggregateInputType;
    _min?: PayrollApplicationDataMinAggregateInputType;
    _max?: PayrollApplicationDataMaxAggregateInputType;
};
export type PayrollApplicationDataGroupByOutputType = {
    id: string;
    applicationId: string;
    dateOfBirth: Date;
    gender: string;
    maritalStatus: string;
    nextOfKinName: string;
    nextOfKinRelationship: string;
    nextOfKinPhone: string;
    loanAmount: number;
    paybackPeriodMonths: number;
    employerName: string;
    employerAddress: string;
    jobTitle: string;
    employeeNumber: string;
    dateOfEmployment: Date;
    grossMonthlySalary: number;
    netMonthlySalary: number;
    payrollDeductionConfirmed: boolean;
    hasOutstandingLoans: boolean;
    outstandingLoanDetails: string | null;
    hasDefaulted: boolean;
    defaultExplanation: string | null;
    _count: PayrollApplicationDataCountAggregateOutputType | null;
    _avg: PayrollApplicationDataAvgAggregateOutputType | null;
    _sum: PayrollApplicationDataSumAggregateOutputType | null;
    _min: PayrollApplicationDataMinAggregateOutputType | null;
    _max: PayrollApplicationDataMaxAggregateOutputType | null;
};
type GetPayrollApplicationDataGroupByPayload<T extends PayrollApplicationDataGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PayrollApplicationDataGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PayrollApplicationDataGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PayrollApplicationDataGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PayrollApplicationDataGroupByOutputType[P]>;
}>>;
export type PayrollApplicationDataWhereInput = {
    AND?: Prisma.PayrollApplicationDataWhereInput | Prisma.PayrollApplicationDataWhereInput[];
    OR?: Prisma.PayrollApplicationDataWhereInput[];
    NOT?: Prisma.PayrollApplicationDataWhereInput | Prisma.PayrollApplicationDataWhereInput[];
    id?: Prisma.StringFilter<"PayrollApplicationData"> | string;
    applicationId?: Prisma.StringFilter<"PayrollApplicationData"> | string;
    dateOfBirth?: Prisma.DateTimeFilter<"PayrollApplicationData"> | Date | string;
    gender?: Prisma.StringFilter<"PayrollApplicationData"> | string;
    maritalStatus?: Prisma.StringFilter<"PayrollApplicationData"> | string;
    nextOfKinName?: Prisma.StringFilter<"PayrollApplicationData"> | string;
    nextOfKinRelationship?: Prisma.StringFilter<"PayrollApplicationData"> | string;
    nextOfKinPhone?: Prisma.StringFilter<"PayrollApplicationData"> | string;
    loanAmount?: Prisma.FloatFilter<"PayrollApplicationData"> | number;
    paybackPeriodMonths?: Prisma.IntFilter<"PayrollApplicationData"> | number;
    employerName?: Prisma.StringFilter<"PayrollApplicationData"> | string;
    employerAddress?: Prisma.StringFilter<"PayrollApplicationData"> | string;
    jobTitle?: Prisma.StringFilter<"PayrollApplicationData"> | string;
    employeeNumber?: Prisma.StringFilter<"PayrollApplicationData"> | string;
    dateOfEmployment?: Prisma.DateTimeFilter<"PayrollApplicationData"> | Date | string;
    grossMonthlySalary?: Prisma.FloatFilter<"PayrollApplicationData"> | number;
    netMonthlySalary?: Prisma.FloatFilter<"PayrollApplicationData"> | number;
    payrollDeductionConfirmed?: Prisma.BoolFilter<"PayrollApplicationData"> | boolean;
    hasOutstandingLoans?: Prisma.BoolFilter<"PayrollApplicationData"> | boolean;
    outstandingLoanDetails?: Prisma.StringNullableFilter<"PayrollApplicationData"> | string | null;
    hasDefaulted?: Prisma.BoolFilter<"PayrollApplicationData"> | boolean;
    defaultExplanation?: Prisma.StringNullableFilter<"PayrollApplicationData"> | string | null;
    application?: Prisma.XOR<Prisma.ApplicationScalarRelationFilter, Prisma.ApplicationWhereInput>;
};
export type PayrollApplicationDataOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    applicationId?: Prisma.SortOrder;
    dateOfBirth?: Prisma.SortOrder;
    gender?: Prisma.SortOrder;
    maritalStatus?: Prisma.SortOrder;
    nextOfKinName?: Prisma.SortOrder;
    nextOfKinRelationship?: Prisma.SortOrder;
    nextOfKinPhone?: Prisma.SortOrder;
    loanAmount?: Prisma.SortOrder;
    paybackPeriodMonths?: Prisma.SortOrder;
    employerName?: Prisma.SortOrder;
    employerAddress?: Prisma.SortOrder;
    jobTitle?: Prisma.SortOrder;
    employeeNumber?: Prisma.SortOrder;
    dateOfEmployment?: Prisma.SortOrder;
    grossMonthlySalary?: Prisma.SortOrder;
    netMonthlySalary?: Prisma.SortOrder;
    payrollDeductionConfirmed?: Prisma.SortOrder;
    hasOutstandingLoans?: Prisma.SortOrder;
    outstandingLoanDetails?: Prisma.SortOrderInput | Prisma.SortOrder;
    hasDefaulted?: Prisma.SortOrder;
    defaultExplanation?: Prisma.SortOrderInput | Prisma.SortOrder;
    application?: Prisma.ApplicationOrderByWithRelationInput;
};
export type PayrollApplicationDataWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    applicationId?: string;
    AND?: Prisma.PayrollApplicationDataWhereInput | Prisma.PayrollApplicationDataWhereInput[];
    OR?: Prisma.PayrollApplicationDataWhereInput[];
    NOT?: Prisma.PayrollApplicationDataWhereInput | Prisma.PayrollApplicationDataWhereInput[];
    dateOfBirth?: Prisma.DateTimeFilter<"PayrollApplicationData"> | Date | string;
    gender?: Prisma.StringFilter<"PayrollApplicationData"> | string;
    maritalStatus?: Prisma.StringFilter<"PayrollApplicationData"> | string;
    nextOfKinName?: Prisma.StringFilter<"PayrollApplicationData"> | string;
    nextOfKinRelationship?: Prisma.StringFilter<"PayrollApplicationData"> | string;
    nextOfKinPhone?: Prisma.StringFilter<"PayrollApplicationData"> | string;
    loanAmount?: Prisma.FloatFilter<"PayrollApplicationData"> | number;
    paybackPeriodMonths?: Prisma.IntFilter<"PayrollApplicationData"> | number;
    employerName?: Prisma.StringFilter<"PayrollApplicationData"> | string;
    employerAddress?: Prisma.StringFilter<"PayrollApplicationData"> | string;
    jobTitle?: Prisma.StringFilter<"PayrollApplicationData"> | string;
    employeeNumber?: Prisma.StringFilter<"PayrollApplicationData"> | string;
    dateOfEmployment?: Prisma.DateTimeFilter<"PayrollApplicationData"> | Date | string;
    grossMonthlySalary?: Prisma.FloatFilter<"PayrollApplicationData"> | number;
    netMonthlySalary?: Prisma.FloatFilter<"PayrollApplicationData"> | number;
    payrollDeductionConfirmed?: Prisma.BoolFilter<"PayrollApplicationData"> | boolean;
    hasOutstandingLoans?: Prisma.BoolFilter<"PayrollApplicationData"> | boolean;
    outstandingLoanDetails?: Prisma.StringNullableFilter<"PayrollApplicationData"> | string | null;
    hasDefaulted?: Prisma.BoolFilter<"PayrollApplicationData"> | boolean;
    defaultExplanation?: Prisma.StringNullableFilter<"PayrollApplicationData"> | string | null;
    application?: Prisma.XOR<Prisma.ApplicationScalarRelationFilter, Prisma.ApplicationWhereInput>;
}, "id" | "applicationId">;
export type PayrollApplicationDataOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    applicationId?: Prisma.SortOrder;
    dateOfBirth?: Prisma.SortOrder;
    gender?: Prisma.SortOrder;
    maritalStatus?: Prisma.SortOrder;
    nextOfKinName?: Prisma.SortOrder;
    nextOfKinRelationship?: Prisma.SortOrder;
    nextOfKinPhone?: Prisma.SortOrder;
    loanAmount?: Prisma.SortOrder;
    paybackPeriodMonths?: Prisma.SortOrder;
    employerName?: Prisma.SortOrder;
    employerAddress?: Prisma.SortOrder;
    jobTitle?: Prisma.SortOrder;
    employeeNumber?: Prisma.SortOrder;
    dateOfEmployment?: Prisma.SortOrder;
    grossMonthlySalary?: Prisma.SortOrder;
    netMonthlySalary?: Prisma.SortOrder;
    payrollDeductionConfirmed?: Prisma.SortOrder;
    hasOutstandingLoans?: Prisma.SortOrder;
    outstandingLoanDetails?: Prisma.SortOrderInput | Prisma.SortOrder;
    hasDefaulted?: Prisma.SortOrder;
    defaultExplanation?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.PayrollApplicationDataCountOrderByAggregateInput;
    _avg?: Prisma.PayrollApplicationDataAvgOrderByAggregateInput;
    _max?: Prisma.PayrollApplicationDataMaxOrderByAggregateInput;
    _min?: Prisma.PayrollApplicationDataMinOrderByAggregateInput;
    _sum?: Prisma.PayrollApplicationDataSumOrderByAggregateInput;
};
export type PayrollApplicationDataScalarWhereWithAggregatesInput = {
    AND?: Prisma.PayrollApplicationDataScalarWhereWithAggregatesInput | Prisma.PayrollApplicationDataScalarWhereWithAggregatesInput[];
    OR?: Prisma.PayrollApplicationDataScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PayrollApplicationDataScalarWhereWithAggregatesInput | Prisma.PayrollApplicationDataScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PayrollApplicationData"> | string;
    applicationId?: Prisma.StringWithAggregatesFilter<"PayrollApplicationData"> | string;
    dateOfBirth?: Prisma.DateTimeWithAggregatesFilter<"PayrollApplicationData"> | Date | string;
    gender?: Prisma.StringWithAggregatesFilter<"PayrollApplicationData"> | string;
    maritalStatus?: Prisma.StringWithAggregatesFilter<"PayrollApplicationData"> | string;
    nextOfKinName?: Prisma.StringWithAggregatesFilter<"PayrollApplicationData"> | string;
    nextOfKinRelationship?: Prisma.StringWithAggregatesFilter<"PayrollApplicationData"> | string;
    nextOfKinPhone?: Prisma.StringWithAggregatesFilter<"PayrollApplicationData"> | string;
    loanAmount?: Prisma.FloatWithAggregatesFilter<"PayrollApplicationData"> | number;
    paybackPeriodMonths?: Prisma.IntWithAggregatesFilter<"PayrollApplicationData"> | number;
    employerName?: Prisma.StringWithAggregatesFilter<"PayrollApplicationData"> | string;
    employerAddress?: Prisma.StringWithAggregatesFilter<"PayrollApplicationData"> | string;
    jobTitle?: Prisma.StringWithAggregatesFilter<"PayrollApplicationData"> | string;
    employeeNumber?: Prisma.StringWithAggregatesFilter<"PayrollApplicationData"> | string;
    dateOfEmployment?: Prisma.DateTimeWithAggregatesFilter<"PayrollApplicationData"> | Date | string;
    grossMonthlySalary?: Prisma.FloatWithAggregatesFilter<"PayrollApplicationData"> | number;
    netMonthlySalary?: Prisma.FloatWithAggregatesFilter<"PayrollApplicationData"> | number;
    payrollDeductionConfirmed?: Prisma.BoolWithAggregatesFilter<"PayrollApplicationData"> | boolean;
    hasOutstandingLoans?: Prisma.BoolWithAggregatesFilter<"PayrollApplicationData"> | boolean;
    outstandingLoanDetails?: Prisma.StringNullableWithAggregatesFilter<"PayrollApplicationData"> | string | null;
    hasDefaulted?: Prisma.BoolWithAggregatesFilter<"PayrollApplicationData"> | boolean;
    defaultExplanation?: Prisma.StringNullableWithAggregatesFilter<"PayrollApplicationData"> | string | null;
};
export type PayrollApplicationDataCreateInput = {
    id?: string;
    dateOfBirth: Date | string;
    gender: string;
    maritalStatus: string;
    nextOfKinName: string;
    nextOfKinRelationship: string;
    nextOfKinPhone: string;
    loanAmount: number;
    paybackPeriodMonths: number;
    employerName: string;
    employerAddress: string;
    jobTitle: string;
    employeeNumber: string;
    dateOfEmployment: Date | string;
    grossMonthlySalary: number;
    netMonthlySalary: number;
    payrollDeductionConfirmed: boolean;
    hasOutstandingLoans: boolean;
    outstandingLoanDetails?: string | null;
    hasDefaulted: boolean;
    defaultExplanation?: string | null;
    application: Prisma.ApplicationCreateNestedOneWithoutPayrollDataInput;
};
export type PayrollApplicationDataUncheckedCreateInput = {
    id?: string;
    applicationId: string;
    dateOfBirth: Date | string;
    gender: string;
    maritalStatus: string;
    nextOfKinName: string;
    nextOfKinRelationship: string;
    nextOfKinPhone: string;
    loanAmount: number;
    paybackPeriodMonths: number;
    employerName: string;
    employerAddress: string;
    jobTitle: string;
    employeeNumber: string;
    dateOfEmployment: Date | string;
    grossMonthlySalary: number;
    netMonthlySalary: number;
    payrollDeductionConfirmed: boolean;
    hasOutstandingLoans: boolean;
    outstandingLoanDetails?: string | null;
    hasDefaulted: boolean;
    defaultExplanation?: string | null;
};
export type PayrollApplicationDataUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dateOfBirth?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gender?: Prisma.StringFieldUpdateOperationsInput | string;
    maritalStatus?: Prisma.StringFieldUpdateOperationsInput | string;
    nextOfKinName?: Prisma.StringFieldUpdateOperationsInput | string;
    nextOfKinRelationship?: Prisma.StringFieldUpdateOperationsInput | string;
    nextOfKinPhone?: Prisma.StringFieldUpdateOperationsInput | string;
    loanAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    paybackPeriodMonths?: Prisma.IntFieldUpdateOperationsInput | number;
    employerName?: Prisma.StringFieldUpdateOperationsInput | string;
    employerAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    jobTitle?: Prisma.StringFieldUpdateOperationsInput | string;
    employeeNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    dateOfEmployment?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    grossMonthlySalary?: Prisma.FloatFieldUpdateOperationsInput | number;
    netMonthlySalary?: Prisma.FloatFieldUpdateOperationsInput | number;
    payrollDeductionConfirmed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    hasOutstandingLoans?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    outstandingLoanDetails?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hasDefaulted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    defaultExplanation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    application?: Prisma.ApplicationUpdateOneRequiredWithoutPayrollDataNestedInput;
};
export type PayrollApplicationDataUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    applicationId?: Prisma.StringFieldUpdateOperationsInput | string;
    dateOfBirth?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gender?: Prisma.StringFieldUpdateOperationsInput | string;
    maritalStatus?: Prisma.StringFieldUpdateOperationsInput | string;
    nextOfKinName?: Prisma.StringFieldUpdateOperationsInput | string;
    nextOfKinRelationship?: Prisma.StringFieldUpdateOperationsInput | string;
    nextOfKinPhone?: Prisma.StringFieldUpdateOperationsInput | string;
    loanAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    paybackPeriodMonths?: Prisma.IntFieldUpdateOperationsInput | number;
    employerName?: Prisma.StringFieldUpdateOperationsInput | string;
    employerAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    jobTitle?: Prisma.StringFieldUpdateOperationsInput | string;
    employeeNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    dateOfEmployment?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    grossMonthlySalary?: Prisma.FloatFieldUpdateOperationsInput | number;
    netMonthlySalary?: Prisma.FloatFieldUpdateOperationsInput | number;
    payrollDeductionConfirmed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    hasOutstandingLoans?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    outstandingLoanDetails?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hasDefaulted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    defaultExplanation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PayrollApplicationDataCreateManyInput = {
    id?: string;
    applicationId: string;
    dateOfBirth: Date | string;
    gender: string;
    maritalStatus: string;
    nextOfKinName: string;
    nextOfKinRelationship: string;
    nextOfKinPhone: string;
    loanAmount: number;
    paybackPeriodMonths: number;
    employerName: string;
    employerAddress: string;
    jobTitle: string;
    employeeNumber: string;
    dateOfEmployment: Date | string;
    grossMonthlySalary: number;
    netMonthlySalary: number;
    payrollDeductionConfirmed: boolean;
    hasOutstandingLoans: boolean;
    outstandingLoanDetails?: string | null;
    hasDefaulted: boolean;
    defaultExplanation?: string | null;
};
export type PayrollApplicationDataUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dateOfBirth?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gender?: Prisma.StringFieldUpdateOperationsInput | string;
    maritalStatus?: Prisma.StringFieldUpdateOperationsInput | string;
    nextOfKinName?: Prisma.StringFieldUpdateOperationsInput | string;
    nextOfKinRelationship?: Prisma.StringFieldUpdateOperationsInput | string;
    nextOfKinPhone?: Prisma.StringFieldUpdateOperationsInput | string;
    loanAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    paybackPeriodMonths?: Prisma.IntFieldUpdateOperationsInput | number;
    employerName?: Prisma.StringFieldUpdateOperationsInput | string;
    employerAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    jobTitle?: Prisma.StringFieldUpdateOperationsInput | string;
    employeeNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    dateOfEmployment?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    grossMonthlySalary?: Prisma.FloatFieldUpdateOperationsInput | number;
    netMonthlySalary?: Prisma.FloatFieldUpdateOperationsInput | number;
    payrollDeductionConfirmed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    hasOutstandingLoans?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    outstandingLoanDetails?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hasDefaulted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    defaultExplanation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PayrollApplicationDataUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    applicationId?: Prisma.StringFieldUpdateOperationsInput | string;
    dateOfBirth?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gender?: Prisma.StringFieldUpdateOperationsInput | string;
    maritalStatus?: Prisma.StringFieldUpdateOperationsInput | string;
    nextOfKinName?: Prisma.StringFieldUpdateOperationsInput | string;
    nextOfKinRelationship?: Prisma.StringFieldUpdateOperationsInput | string;
    nextOfKinPhone?: Prisma.StringFieldUpdateOperationsInput | string;
    loanAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    paybackPeriodMonths?: Prisma.IntFieldUpdateOperationsInput | number;
    employerName?: Prisma.StringFieldUpdateOperationsInput | string;
    employerAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    jobTitle?: Prisma.StringFieldUpdateOperationsInput | string;
    employeeNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    dateOfEmployment?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    grossMonthlySalary?: Prisma.FloatFieldUpdateOperationsInput | number;
    netMonthlySalary?: Prisma.FloatFieldUpdateOperationsInput | number;
    payrollDeductionConfirmed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    hasOutstandingLoans?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    outstandingLoanDetails?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hasDefaulted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    defaultExplanation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PayrollApplicationDataNullableScalarRelationFilter = {
    is?: Prisma.PayrollApplicationDataWhereInput | null;
    isNot?: Prisma.PayrollApplicationDataWhereInput | null;
};
export type PayrollApplicationDataCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    applicationId?: Prisma.SortOrder;
    dateOfBirth?: Prisma.SortOrder;
    gender?: Prisma.SortOrder;
    maritalStatus?: Prisma.SortOrder;
    nextOfKinName?: Prisma.SortOrder;
    nextOfKinRelationship?: Prisma.SortOrder;
    nextOfKinPhone?: Prisma.SortOrder;
    loanAmount?: Prisma.SortOrder;
    paybackPeriodMonths?: Prisma.SortOrder;
    employerName?: Prisma.SortOrder;
    employerAddress?: Prisma.SortOrder;
    jobTitle?: Prisma.SortOrder;
    employeeNumber?: Prisma.SortOrder;
    dateOfEmployment?: Prisma.SortOrder;
    grossMonthlySalary?: Prisma.SortOrder;
    netMonthlySalary?: Prisma.SortOrder;
    payrollDeductionConfirmed?: Prisma.SortOrder;
    hasOutstandingLoans?: Prisma.SortOrder;
    outstandingLoanDetails?: Prisma.SortOrder;
    hasDefaulted?: Prisma.SortOrder;
    defaultExplanation?: Prisma.SortOrder;
};
export type PayrollApplicationDataAvgOrderByAggregateInput = {
    loanAmount?: Prisma.SortOrder;
    paybackPeriodMonths?: Prisma.SortOrder;
    grossMonthlySalary?: Prisma.SortOrder;
    netMonthlySalary?: Prisma.SortOrder;
};
export type PayrollApplicationDataMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    applicationId?: Prisma.SortOrder;
    dateOfBirth?: Prisma.SortOrder;
    gender?: Prisma.SortOrder;
    maritalStatus?: Prisma.SortOrder;
    nextOfKinName?: Prisma.SortOrder;
    nextOfKinRelationship?: Prisma.SortOrder;
    nextOfKinPhone?: Prisma.SortOrder;
    loanAmount?: Prisma.SortOrder;
    paybackPeriodMonths?: Prisma.SortOrder;
    employerName?: Prisma.SortOrder;
    employerAddress?: Prisma.SortOrder;
    jobTitle?: Prisma.SortOrder;
    employeeNumber?: Prisma.SortOrder;
    dateOfEmployment?: Prisma.SortOrder;
    grossMonthlySalary?: Prisma.SortOrder;
    netMonthlySalary?: Prisma.SortOrder;
    payrollDeductionConfirmed?: Prisma.SortOrder;
    hasOutstandingLoans?: Prisma.SortOrder;
    outstandingLoanDetails?: Prisma.SortOrder;
    hasDefaulted?: Prisma.SortOrder;
    defaultExplanation?: Prisma.SortOrder;
};
export type PayrollApplicationDataMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    applicationId?: Prisma.SortOrder;
    dateOfBirth?: Prisma.SortOrder;
    gender?: Prisma.SortOrder;
    maritalStatus?: Prisma.SortOrder;
    nextOfKinName?: Prisma.SortOrder;
    nextOfKinRelationship?: Prisma.SortOrder;
    nextOfKinPhone?: Prisma.SortOrder;
    loanAmount?: Prisma.SortOrder;
    paybackPeriodMonths?: Prisma.SortOrder;
    employerName?: Prisma.SortOrder;
    employerAddress?: Prisma.SortOrder;
    jobTitle?: Prisma.SortOrder;
    employeeNumber?: Prisma.SortOrder;
    dateOfEmployment?: Prisma.SortOrder;
    grossMonthlySalary?: Prisma.SortOrder;
    netMonthlySalary?: Prisma.SortOrder;
    payrollDeductionConfirmed?: Prisma.SortOrder;
    hasOutstandingLoans?: Prisma.SortOrder;
    outstandingLoanDetails?: Prisma.SortOrder;
    hasDefaulted?: Prisma.SortOrder;
    defaultExplanation?: Prisma.SortOrder;
};
export type PayrollApplicationDataSumOrderByAggregateInput = {
    loanAmount?: Prisma.SortOrder;
    paybackPeriodMonths?: Prisma.SortOrder;
    grossMonthlySalary?: Prisma.SortOrder;
    netMonthlySalary?: Prisma.SortOrder;
};
export type PayrollApplicationDataCreateNestedOneWithoutApplicationInput = {
    create?: Prisma.XOR<Prisma.PayrollApplicationDataCreateWithoutApplicationInput, Prisma.PayrollApplicationDataUncheckedCreateWithoutApplicationInput>;
    connectOrCreate?: Prisma.PayrollApplicationDataCreateOrConnectWithoutApplicationInput;
    connect?: Prisma.PayrollApplicationDataWhereUniqueInput;
};
export type PayrollApplicationDataUncheckedCreateNestedOneWithoutApplicationInput = {
    create?: Prisma.XOR<Prisma.PayrollApplicationDataCreateWithoutApplicationInput, Prisma.PayrollApplicationDataUncheckedCreateWithoutApplicationInput>;
    connectOrCreate?: Prisma.PayrollApplicationDataCreateOrConnectWithoutApplicationInput;
    connect?: Prisma.PayrollApplicationDataWhereUniqueInput;
};
export type PayrollApplicationDataUpdateOneWithoutApplicationNestedInput = {
    create?: Prisma.XOR<Prisma.PayrollApplicationDataCreateWithoutApplicationInput, Prisma.PayrollApplicationDataUncheckedCreateWithoutApplicationInput>;
    connectOrCreate?: Prisma.PayrollApplicationDataCreateOrConnectWithoutApplicationInput;
    upsert?: Prisma.PayrollApplicationDataUpsertWithoutApplicationInput;
    disconnect?: Prisma.PayrollApplicationDataWhereInput | boolean;
    delete?: Prisma.PayrollApplicationDataWhereInput | boolean;
    connect?: Prisma.PayrollApplicationDataWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PayrollApplicationDataUpdateToOneWithWhereWithoutApplicationInput, Prisma.PayrollApplicationDataUpdateWithoutApplicationInput>, Prisma.PayrollApplicationDataUncheckedUpdateWithoutApplicationInput>;
};
export type PayrollApplicationDataUncheckedUpdateOneWithoutApplicationNestedInput = {
    create?: Prisma.XOR<Prisma.PayrollApplicationDataCreateWithoutApplicationInput, Prisma.PayrollApplicationDataUncheckedCreateWithoutApplicationInput>;
    connectOrCreate?: Prisma.PayrollApplicationDataCreateOrConnectWithoutApplicationInput;
    upsert?: Prisma.PayrollApplicationDataUpsertWithoutApplicationInput;
    disconnect?: Prisma.PayrollApplicationDataWhereInput | boolean;
    delete?: Prisma.PayrollApplicationDataWhereInput | boolean;
    connect?: Prisma.PayrollApplicationDataWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PayrollApplicationDataUpdateToOneWithWhereWithoutApplicationInput, Prisma.PayrollApplicationDataUpdateWithoutApplicationInput>, Prisma.PayrollApplicationDataUncheckedUpdateWithoutApplicationInput>;
};
export type PayrollApplicationDataCreateWithoutApplicationInput = {
    id?: string;
    dateOfBirth: Date | string;
    gender: string;
    maritalStatus: string;
    nextOfKinName: string;
    nextOfKinRelationship: string;
    nextOfKinPhone: string;
    loanAmount: number;
    paybackPeriodMonths: number;
    employerName: string;
    employerAddress: string;
    jobTitle: string;
    employeeNumber: string;
    dateOfEmployment: Date | string;
    grossMonthlySalary: number;
    netMonthlySalary: number;
    payrollDeductionConfirmed: boolean;
    hasOutstandingLoans: boolean;
    outstandingLoanDetails?: string | null;
    hasDefaulted: boolean;
    defaultExplanation?: string | null;
};
export type PayrollApplicationDataUncheckedCreateWithoutApplicationInput = {
    id?: string;
    dateOfBirth: Date | string;
    gender: string;
    maritalStatus: string;
    nextOfKinName: string;
    nextOfKinRelationship: string;
    nextOfKinPhone: string;
    loanAmount: number;
    paybackPeriodMonths: number;
    employerName: string;
    employerAddress: string;
    jobTitle: string;
    employeeNumber: string;
    dateOfEmployment: Date | string;
    grossMonthlySalary: number;
    netMonthlySalary: number;
    payrollDeductionConfirmed: boolean;
    hasOutstandingLoans: boolean;
    outstandingLoanDetails?: string | null;
    hasDefaulted: boolean;
    defaultExplanation?: string | null;
};
export type PayrollApplicationDataCreateOrConnectWithoutApplicationInput = {
    where: Prisma.PayrollApplicationDataWhereUniqueInput;
    create: Prisma.XOR<Prisma.PayrollApplicationDataCreateWithoutApplicationInput, Prisma.PayrollApplicationDataUncheckedCreateWithoutApplicationInput>;
};
export type PayrollApplicationDataUpsertWithoutApplicationInput = {
    update: Prisma.XOR<Prisma.PayrollApplicationDataUpdateWithoutApplicationInput, Prisma.PayrollApplicationDataUncheckedUpdateWithoutApplicationInput>;
    create: Prisma.XOR<Prisma.PayrollApplicationDataCreateWithoutApplicationInput, Prisma.PayrollApplicationDataUncheckedCreateWithoutApplicationInput>;
    where?: Prisma.PayrollApplicationDataWhereInput;
};
export type PayrollApplicationDataUpdateToOneWithWhereWithoutApplicationInput = {
    where?: Prisma.PayrollApplicationDataWhereInput;
    data: Prisma.XOR<Prisma.PayrollApplicationDataUpdateWithoutApplicationInput, Prisma.PayrollApplicationDataUncheckedUpdateWithoutApplicationInput>;
};
export type PayrollApplicationDataUpdateWithoutApplicationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dateOfBirth?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gender?: Prisma.StringFieldUpdateOperationsInput | string;
    maritalStatus?: Prisma.StringFieldUpdateOperationsInput | string;
    nextOfKinName?: Prisma.StringFieldUpdateOperationsInput | string;
    nextOfKinRelationship?: Prisma.StringFieldUpdateOperationsInput | string;
    nextOfKinPhone?: Prisma.StringFieldUpdateOperationsInput | string;
    loanAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    paybackPeriodMonths?: Prisma.IntFieldUpdateOperationsInput | number;
    employerName?: Prisma.StringFieldUpdateOperationsInput | string;
    employerAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    jobTitle?: Prisma.StringFieldUpdateOperationsInput | string;
    employeeNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    dateOfEmployment?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    grossMonthlySalary?: Prisma.FloatFieldUpdateOperationsInput | number;
    netMonthlySalary?: Prisma.FloatFieldUpdateOperationsInput | number;
    payrollDeductionConfirmed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    hasOutstandingLoans?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    outstandingLoanDetails?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hasDefaulted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    defaultExplanation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PayrollApplicationDataUncheckedUpdateWithoutApplicationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dateOfBirth?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gender?: Prisma.StringFieldUpdateOperationsInput | string;
    maritalStatus?: Prisma.StringFieldUpdateOperationsInput | string;
    nextOfKinName?: Prisma.StringFieldUpdateOperationsInput | string;
    nextOfKinRelationship?: Prisma.StringFieldUpdateOperationsInput | string;
    nextOfKinPhone?: Prisma.StringFieldUpdateOperationsInput | string;
    loanAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    paybackPeriodMonths?: Prisma.IntFieldUpdateOperationsInput | number;
    employerName?: Prisma.StringFieldUpdateOperationsInput | string;
    employerAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    jobTitle?: Prisma.StringFieldUpdateOperationsInput | string;
    employeeNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    dateOfEmployment?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    grossMonthlySalary?: Prisma.FloatFieldUpdateOperationsInput | number;
    netMonthlySalary?: Prisma.FloatFieldUpdateOperationsInput | number;
    payrollDeductionConfirmed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    hasOutstandingLoans?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    outstandingLoanDetails?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    hasDefaulted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    defaultExplanation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PayrollApplicationDataSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    applicationId?: boolean;
    dateOfBirth?: boolean;
    gender?: boolean;
    maritalStatus?: boolean;
    nextOfKinName?: boolean;
    nextOfKinRelationship?: boolean;
    nextOfKinPhone?: boolean;
    loanAmount?: boolean;
    paybackPeriodMonths?: boolean;
    employerName?: boolean;
    employerAddress?: boolean;
    jobTitle?: boolean;
    employeeNumber?: boolean;
    dateOfEmployment?: boolean;
    grossMonthlySalary?: boolean;
    netMonthlySalary?: boolean;
    payrollDeductionConfirmed?: boolean;
    hasOutstandingLoans?: boolean;
    outstandingLoanDetails?: boolean;
    hasDefaulted?: boolean;
    defaultExplanation?: boolean;
    application?: boolean | Prisma.ApplicationDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["payrollApplicationData"]>;
export type PayrollApplicationDataSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    applicationId?: boolean;
    dateOfBirth?: boolean;
    gender?: boolean;
    maritalStatus?: boolean;
    nextOfKinName?: boolean;
    nextOfKinRelationship?: boolean;
    nextOfKinPhone?: boolean;
    loanAmount?: boolean;
    paybackPeriodMonths?: boolean;
    employerName?: boolean;
    employerAddress?: boolean;
    jobTitle?: boolean;
    employeeNumber?: boolean;
    dateOfEmployment?: boolean;
    grossMonthlySalary?: boolean;
    netMonthlySalary?: boolean;
    payrollDeductionConfirmed?: boolean;
    hasOutstandingLoans?: boolean;
    outstandingLoanDetails?: boolean;
    hasDefaulted?: boolean;
    defaultExplanation?: boolean;
    application?: boolean | Prisma.ApplicationDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["payrollApplicationData"]>;
export type PayrollApplicationDataSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    applicationId?: boolean;
    dateOfBirth?: boolean;
    gender?: boolean;
    maritalStatus?: boolean;
    nextOfKinName?: boolean;
    nextOfKinRelationship?: boolean;
    nextOfKinPhone?: boolean;
    loanAmount?: boolean;
    paybackPeriodMonths?: boolean;
    employerName?: boolean;
    employerAddress?: boolean;
    jobTitle?: boolean;
    employeeNumber?: boolean;
    dateOfEmployment?: boolean;
    grossMonthlySalary?: boolean;
    netMonthlySalary?: boolean;
    payrollDeductionConfirmed?: boolean;
    hasOutstandingLoans?: boolean;
    outstandingLoanDetails?: boolean;
    hasDefaulted?: boolean;
    defaultExplanation?: boolean;
    application?: boolean | Prisma.ApplicationDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["payrollApplicationData"]>;
export type PayrollApplicationDataSelectScalar = {
    id?: boolean;
    applicationId?: boolean;
    dateOfBirth?: boolean;
    gender?: boolean;
    maritalStatus?: boolean;
    nextOfKinName?: boolean;
    nextOfKinRelationship?: boolean;
    nextOfKinPhone?: boolean;
    loanAmount?: boolean;
    paybackPeriodMonths?: boolean;
    employerName?: boolean;
    employerAddress?: boolean;
    jobTitle?: boolean;
    employeeNumber?: boolean;
    dateOfEmployment?: boolean;
    grossMonthlySalary?: boolean;
    netMonthlySalary?: boolean;
    payrollDeductionConfirmed?: boolean;
    hasOutstandingLoans?: boolean;
    outstandingLoanDetails?: boolean;
    hasDefaulted?: boolean;
    defaultExplanation?: boolean;
};
export type PayrollApplicationDataOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "applicationId" | "dateOfBirth" | "gender" | "maritalStatus" | "nextOfKinName" | "nextOfKinRelationship" | "nextOfKinPhone" | "loanAmount" | "paybackPeriodMonths" | "employerName" | "employerAddress" | "jobTitle" | "employeeNumber" | "dateOfEmployment" | "grossMonthlySalary" | "netMonthlySalary" | "payrollDeductionConfirmed" | "hasOutstandingLoans" | "outstandingLoanDetails" | "hasDefaulted" | "defaultExplanation", ExtArgs["result"]["payrollApplicationData"]>;
export type PayrollApplicationDataInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    application?: boolean | Prisma.ApplicationDefaultArgs<ExtArgs>;
};
export type PayrollApplicationDataIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    application?: boolean | Prisma.ApplicationDefaultArgs<ExtArgs>;
};
export type PayrollApplicationDataIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    application?: boolean | Prisma.ApplicationDefaultArgs<ExtArgs>;
};
export type $PayrollApplicationDataPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PayrollApplicationData";
    objects: {
        application: Prisma.$ApplicationPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        applicationId: string;
        dateOfBirth: Date;
        gender: string;
        maritalStatus: string;
        nextOfKinName: string;
        nextOfKinRelationship: string;
        nextOfKinPhone: string;
        loanAmount: number;
        paybackPeriodMonths: number;
        employerName: string;
        employerAddress: string;
        jobTitle: string;
        employeeNumber: string;
        dateOfEmployment: Date;
        grossMonthlySalary: number;
        netMonthlySalary: number;
        payrollDeductionConfirmed: boolean;
        hasOutstandingLoans: boolean;
        outstandingLoanDetails: string | null;
        hasDefaulted: boolean;
        defaultExplanation: string | null;
    }, ExtArgs["result"]["payrollApplicationData"]>;
    composites: {};
};
export type PayrollApplicationDataGetPayload<S extends boolean | null | undefined | PayrollApplicationDataDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PayrollApplicationDataPayload, S>;
export type PayrollApplicationDataCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PayrollApplicationDataFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PayrollApplicationDataCountAggregateInputType | true;
};
export interface PayrollApplicationDataDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PayrollApplicationData'];
        meta: {
            name: 'PayrollApplicationData';
        };
    };
    /**
     * Find zero or one PayrollApplicationData that matches the filter.
     * @param {PayrollApplicationDataFindUniqueArgs} args - Arguments to find a PayrollApplicationData
     * @example
     * // Get one PayrollApplicationData
     * const payrollApplicationData = await prisma.payrollApplicationData.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PayrollApplicationDataFindUniqueArgs>(args: Prisma.SelectSubset<T, PayrollApplicationDataFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PayrollApplicationDataClient<runtime.Types.Result.GetResult<Prisma.$PayrollApplicationDataPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one PayrollApplicationData that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PayrollApplicationDataFindUniqueOrThrowArgs} args - Arguments to find a PayrollApplicationData
     * @example
     * // Get one PayrollApplicationData
     * const payrollApplicationData = await prisma.payrollApplicationData.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PayrollApplicationDataFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PayrollApplicationDataFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PayrollApplicationDataClient<runtime.Types.Result.GetResult<Prisma.$PayrollApplicationDataPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first PayrollApplicationData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayrollApplicationDataFindFirstArgs} args - Arguments to find a PayrollApplicationData
     * @example
     * // Get one PayrollApplicationData
     * const payrollApplicationData = await prisma.payrollApplicationData.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PayrollApplicationDataFindFirstArgs>(args?: Prisma.SelectSubset<T, PayrollApplicationDataFindFirstArgs<ExtArgs>>): Prisma.Prisma__PayrollApplicationDataClient<runtime.Types.Result.GetResult<Prisma.$PayrollApplicationDataPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first PayrollApplicationData that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayrollApplicationDataFindFirstOrThrowArgs} args - Arguments to find a PayrollApplicationData
     * @example
     * // Get one PayrollApplicationData
     * const payrollApplicationData = await prisma.payrollApplicationData.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PayrollApplicationDataFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PayrollApplicationDataFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PayrollApplicationDataClient<runtime.Types.Result.GetResult<Prisma.$PayrollApplicationDataPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more PayrollApplicationData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayrollApplicationDataFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PayrollApplicationData
     * const payrollApplicationData = await prisma.payrollApplicationData.findMany()
     *
     * // Get first 10 PayrollApplicationData
     * const payrollApplicationData = await prisma.payrollApplicationData.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const payrollApplicationDataWithIdOnly = await prisma.payrollApplicationData.findMany({ select: { id: true } })
     *
     */
    findMany<T extends PayrollApplicationDataFindManyArgs>(args?: Prisma.SelectSubset<T, PayrollApplicationDataFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PayrollApplicationDataPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a PayrollApplicationData.
     * @param {PayrollApplicationDataCreateArgs} args - Arguments to create a PayrollApplicationData.
     * @example
     * // Create one PayrollApplicationData
     * const PayrollApplicationData = await prisma.payrollApplicationData.create({
     *   data: {
     *     // ... data to create a PayrollApplicationData
     *   }
     * })
     *
     */
    create<T extends PayrollApplicationDataCreateArgs>(args: Prisma.SelectSubset<T, PayrollApplicationDataCreateArgs<ExtArgs>>): Prisma.Prisma__PayrollApplicationDataClient<runtime.Types.Result.GetResult<Prisma.$PayrollApplicationDataPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many PayrollApplicationData.
     * @param {PayrollApplicationDataCreateManyArgs} args - Arguments to create many PayrollApplicationData.
     * @example
     * // Create many PayrollApplicationData
     * const payrollApplicationData = await prisma.payrollApplicationData.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends PayrollApplicationDataCreateManyArgs>(args?: Prisma.SelectSubset<T, PayrollApplicationDataCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many PayrollApplicationData and returns the data saved in the database.
     * @param {PayrollApplicationDataCreateManyAndReturnArgs} args - Arguments to create many PayrollApplicationData.
     * @example
     * // Create many PayrollApplicationData
     * const payrollApplicationData = await prisma.payrollApplicationData.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many PayrollApplicationData and only return the `id`
     * const payrollApplicationDataWithIdOnly = await prisma.payrollApplicationData.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends PayrollApplicationDataCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PayrollApplicationDataCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PayrollApplicationDataPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a PayrollApplicationData.
     * @param {PayrollApplicationDataDeleteArgs} args - Arguments to delete one PayrollApplicationData.
     * @example
     * // Delete one PayrollApplicationData
     * const PayrollApplicationData = await prisma.payrollApplicationData.delete({
     *   where: {
     *     // ... filter to delete one PayrollApplicationData
     *   }
     * })
     *
     */
    delete<T extends PayrollApplicationDataDeleteArgs>(args: Prisma.SelectSubset<T, PayrollApplicationDataDeleteArgs<ExtArgs>>): Prisma.Prisma__PayrollApplicationDataClient<runtime.Types.Result.GetResult<Prisma.$PayrollApplicationDataPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one PayrollApplicationData.
     * @param {PayrollApplicationDataUpdateArgs} args - Arguments to update one PayrollApplicationData.
     * @example
     * // Update one PayrollApplicationData
     * const payrollApplicationData = await prisma.payrollApplicationData.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends PayrollApplicationDataUpdateArgs>(args: Prisma.SelectSubset<T, PayrollApplicationDataUpdateArgs<ExtArgs>>): Prisma.Prisma__PayrollApplicationDataClient<runtime.Types.Result.GetResult<Prisma.$PayrollApplicationDataPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more PayrollApplicationData.
     * @param {PayrollApplicationDataDeleteManyArgs} args - Arguments to filter PayrollApplicationData to delete.
     * @example
     * // Delete a few PayrollApplicationData
     * const { count } = await prisma.payrollApplicationData.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends PayrollApplicationDataDeleteManyArgs>(args?: Prisma.SelectSubset<T, PayrollApplicationDataDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more PayrollApplicationData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayrollApplicationDataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PayrollApplicationData
     * const payrollApplicationData = await prisma.payrollApplicationData.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends PayrollApplicationDataUpdateManyArgs>(args: Prisma.SelectSubset<T, PayrollApplicationDataUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more PayrollApplicationData and returns the data updated in the database.
     * @param {PayrollApplicationDataUpdateManyAndReturnArgs} args - Arguments to update many PayrollApplicationData.
     * @example
     * // Update many PayrollApplicationData
     * const payrollApplicationData = await prisma.payrollApplicationData.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more PayrollApplicationData and only return the `id`
     * const payrollApplicationDataWithIdOnly = await prisma.payrollApplicationData.updateManyAndReturn({
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
    updateManyAndReturn<T extends PayrollApplicationDataUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PayrollApplicationDataUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PayrollApplicationDataPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one PayrollApplicationData.
     * @param {PayrollApplicationDataUpsertArgs} args - Arguments to update or create a PayrollApplicationData.
     * @example
     * // Update or create a PayrollApplicationData
     * const payrollApplicationData = await prisma.payrollApplicationData.upsert({
     *   create: {
     *     // ... data to create a PayrollApplicationData
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PayrollApplicationData we want to update
     *   }
     * })
     */
    upsert<T extends PayrollApplicationDataUpsertArgs>(args: Prisma.SelectSubset<T, PayrollApplicationDataUpsertArgs<ExtArgs>>): Prisma.Prisma__PayrollApplicationDataClient<runtime.Types.Result.GetResult<Prisma.$PayrollApplicationDataPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of PayrollApplicationData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayrollApplicationDataCountArgs} args - Arguments to filter PayrollApplicationData to count.
     * @example
     * // Count the number of PayrollApplicationData
     * const count = await prisma.payrollApplicationData.count({
     *   where: {
     *     // ... the filter for the PayrollApplicationData we want to count
     *   }
     * })
    **/
    count<T extends PayrollApplicationDataCountArgs>(args?: Prisma.Subset<T, PayrollApplicationDataCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PayrollApplicationDataCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a PayrollApplicationData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayrollApplicationDataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PayrollApplicationDataAggregateArgs>(args: Prisma.Subset<T, PayrollApplicationDataAggregateArgs>): Prisma.PrismaPromise<GetPayrollApplicationDataAggregateType<T>>;
    /**
     * Group by PayrollApplicationData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayrollApplicationDataGroupByArgs} args - Group by arguments.
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
    groupBy<T extends PayrollApplicationDataGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PayrollApplicationDataGroupByArgs['orderBy'];
    } : {
        orderBy?: PayrollApplicationDataGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PayrollApplicationDataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPayrollApplicationDataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the PayrollApplicationData model
     */
    readonly fields: PayrollApplicationDataFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for PayrollApplicationData.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__PayrollApplicationDataClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
 * Fields of the PayrollApplicationData model
 */
export interface PayrollApplicationDataFieldRefs {
    readonly id: Prisma.FieldRef<"PayrollApplicationData", 'String'>;
    readonly applicationId: Prisma.FieldRef<"PayrollApplicationData", 'String'>;
    readonly dateOfBirth: Prisma.FieldRef<"PayrollApplicationData", 'DateTime'>;
    readonly gender: Prisma.FieldRef<"PayrollApplicationData", 'String'>;
    readonly maritalStatus: Prisma.FieldRef<"PayrollApplicationData", 'String'>;
    readonly nextOfKinName: Prisma.FieldRef<"PayrollApplicationData", 'String'>;
    readonly nextOfKinRelationship: Prisma.FieldRef<"PayrollApplicationData", 'String'>;
    readonly nextOfKinPhone: Prisma.FieldRef<"PayrollApplicationData", 'String'>;
    readonly loanAmount: Prisma.FieldRef<"PayrollApplicationData", 'Float'>;
    readonly paybackPeriodMonths: Prisma.FieldRef<"PayrollApplicationData", 'Int'>;
    readonly employerName: Prisma.FieldRef<"PayrollApplicationData", 'String'>;
    readonly employerAddress: Prisma.FieldRef<"PayrollApplicationData", 'String'>;
    readonly jobTitle: Prisma.FieldRef<"PayrollApplicationData", 'String'>;
    readonly employeeNumber: Prisma.FieldRef<"PayrollApplicationData", 'String'>;
    readonly dateOfEmployment: Prisma.FieldRef<"PayrollApplicationData", 'DateTime'>;
    readonly grossMonthlySalary: Prisma.FieldRef<"PayrollApplicationData", 'Float'>;
    readonly netMonthlySalary: Prisma.FieldRef<"PayrollApplicationData", 'Float'>;
    readonly payrollDeductionConfirmed: Prisma.FieldRef<"PayrollApplicationData", 'Boolean'>;
    readonly hasOutstandingLoans: Prisma.FieldRef<"PayrollApplicationData", 'Boolean'>;
    readonly outstandingLoanDetails: Prisma.FieldRef<"PayrollApplicationData", 'String'>;
    readonly hasDefaulted: Prisma.FieldRef<"PayrollApplicationData", 'Boolean'>;
    readonly defaultExplanation: Prisma.FieldRef<"PayrollApplicationData", 'String'>;
}
/**
 * PayrollApplicationData findUnique
 */
export type PayrollApplicationDataFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayrollApplicationData
     */
    select?: Prisma.PayrollApplicationDataSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PayrollApplicationData
     */
    omit?: Prisma.PayrollApplicationDataOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PayrollApplicationDataInclude<ExtArgs> | null;
    /**
     * Filter, which PayrollApplicationData to fetch.
     */
    where: Prisma.PayrollApplicationDataWhereUniqueInput;
};
/**
 * PayrollApplicationData findUniqueOrThrow
 */
export type PayrollApplicationDataFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayrollApplicationData
     */
    select?: Prisma.PayrollApplicationDataSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PayrollApplicationData
     */
    omit?: Prisma.PayrollApplicationDataOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PayrollApplicationDataInclude<ExtArgs> | null;
    /**
     * Filter, which PayrollApplicationData to fetch.
     */
    where: Prisma.PayrollApplicationDataWhereUniqueInput;
};
/**
 * PayrollApplicationData findFirst
 */
export type PayrollApplicationDataFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayrollApplicationData
     */
    select?: Prisma.PayrollApplicationDataSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PayrollApplicationData
     */
    omit?: Prisma.PayrollApplicationDataOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PayrollApplicationDataInclude<ExtArgs> | null;
    /**
     * Filter, which PayrollApplicationData to fetch.
     */
    where?: Prisma.PayrollApplicationDataWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PayrollApplicationData to fetch.
     */
    orderBy?: Prisma.PayrollApplicationDataOrderByWithRelationInput | Prisma.PayrollApplicationDataOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PayrollApplicationData.
     */
    cursor?: Prisma.PayrollApplicationDataWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PayrollApplicationData from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PayrollApplicationData.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PayrollApplicationData.
     */
    distinct?: Prisma.PayrollApplicationDataScalarFieldEnum | Prisma.PayrollApplicationDataScalarFieldEnum[];
};
/**
 * PayrollApplicationData findFirstOrThrow
 */
export type PayrollApplicationDataFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayrollApplicationData
     */
    select?: Prisma.PayrollApplicationDataSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PayrollApplicationData
     */
    omit?: Prisma.PayrollApplicationDataOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PayrollApplicationDataInclude<ExtArgs> | null;
    /**
     * Filter, which PayrollApplicationData to fetch.
     */
    where?: Prisma.PayrollApplicationDataWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PayrollApplicationData to fetch.
     */
    orderBy?: Prisma.PayrollApplicationDataOrderByWithRelationInput | Prisma.PayrollApplicationDataOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PayrollApplicationData.
     */
    cursor?: Prisma.PayrollApplicationDataWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PayrollApplicationData from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PayrollApplicationData.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PayrollApplicationData.
     */
    distinct?: Prisma.PayrollApplicationDataScalarFieldEnum | Prisma.PayrollApplicationDataScalarFieldEnum[];
};
/**
 * PayrollApplicationData findMany
 */
export type PayrollApplicationDataFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayrollApplicationData
     */
    select?: Prisma.PayrollApplicationDataSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PayrollApplicationData
     */
    omit?: Prisma.PayrollApplicationDataOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PayrollApplicationDataInclude<ExtArgs> | null;
    /**
     * Filter, which PayrollApplicationData to fetch.
     */
    where?: Prisma.PayrollApplicationDataWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PayrollApplicationData to fetch.
     */
    orderBy?: Prisma.PayrollApplicationDataOrderByWithRelationInput | Prisma.PayrollApplicationDataOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing PayrollApplicationData.
     */
    cursor?: Prisma.PayrollApplicationDataWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PayrollApplicationData from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PayrollApplicationData.
     */
    skip?: number;
    distinct?: Prisma.PayrollApplicationDataScalarFieldEnum | Prisma.PayrollApplicationDataScalarFieldEnum[];
};
/**
 * PayrollApplicationData create
 */
export type PayrollApplicationDataCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayrollApplicationData
     */
    select?: Prisma.PayrollApplicationDataSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PayrollApplicationData
     */
    omit?: Prisma.PayrollApplicationDataOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PayrollApplicationDataInclude<ExtArgs> | null;
    /**
     * The data needed to create a PayrollApplicationData.
     */
    data: Prisma.XOR<Prisma.PayrollApplicationDataCreateInput, Prisma.PayrollApplicationDataUncheckedCreateInput>;
};
/**
 * PayrollApplicationData createMany
 */
export type PayrollApplicationDataCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many PayrollApplicationData.
     */
    data: Prisma.PayrollApplicationDataCreateManyInput | Prisma.PayrollApplicationDataCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * PayrollApplicationData createManyAndReturn
 */
export type PayrollApplicationDataCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayrollApplicationData
     */
    select?: Prisma.PayrollApplicationDataSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the PayrollApplicationData
     */
    omit?: Prisma.PayrollApplicationDataOmit<ExtArgs> | null;
    /**
     * The data used to create many PayrollApplicationData.
     */
    data: Prisma.PayrollApplicationDataCreateManyInput | Prisma.PayrollApplicationDataCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PayrollApplicationDataIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * PayrollApplicationData update
 */
export type PayrollApplicationDataUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayrollApplicationData
     */
    select?: Prisma.PayrollApplicationDataSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PayrollApplicationData
     */
    omit?: Prisma.PayrollApplicationDataOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PayrollApplicationDataInclude<ExtArgs> | null;
    /**
     * The data needed to update a PayrollApplicationData.
     */
    data: Prisma.XOR<Prisma.PayrollApplicationDataUpdateInput, Prisma.PayrollApplicationDataUncheckedUpdateInput>;
    /**
     * Choose, which PayrollApplicationData to update.
     */
    where: Prisma.PayrollApplicationDataWhereUniqueInput;
};
/**
 * PayrollApplicationData updateMany
 */
export type PayrollApplicationDataUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update PayrollApplicationData.
     */
    data: Prisma.XOR<Prisma.PayrollApplicationDataUpdateManyMutationInput, Prisma.PayrollApplicationDataUncheckedUpdateManyInput>;
    /**
     * Filter which PayrollApplicationData to update
     */
    where?: Prisma.PayrollApplicationDataWhereInput;
    /**
     * Limit how many PayrollApplicationData to update.
     */
    limit?: number;
};
/**
 * PayrollApplicationData updateManyAndReturn
 */
export type PayrollApplicationDataUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayrollApplicationData
     */
    select?: Prisma.PayrollApplicationDataSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the PayrollApplicationData
     */
    omit?: Prisma.PayrollApplicationDataOmit<ExtArgs> | null;
    /**
     * The data used to update PayrollApplicationData.
     */
    data: Prisma.XOR<Prisma.PayrollApplicationDataUpdateManyMutationInput, Prisma.PayrollApplicationDataUncheckedUpdateManyInput>;
    /**
     * Filter which PayrollApplicationData to update
     */
    where?: Prisma.PayrollApplicationDataWhereInput;
    /**
     * Limit how many PayrollApplicationData to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PayrollApplicationDataIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * PayrollApplicationData upsert
 */
export type PayrollApplicationDataUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayrollApplicationData
     */
    select?: Prisma.PayrollApplicationDataSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PayrollApplicationData
     */
    omit?: Prisma.PayrollApplicationDataOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PayrollApplicationDataInclude<ExtArgs> | null;
    /**
     * The filter to search for the PayrollApplicationData to update in case it exists.
     */
    where: Prisma.PayrollApplicationDataWhereUniqueInput;
    /**
     * In case the PayrollApplicationData found by the `where` argument doesn't exist, create a new PayrollApplicationData with this data.
     */
    create: Prisma.XOR<Prisma.PayrollApplicationDataCreateInput, Prisma.PayrollApplicationDataUncheckedCreateInput>;
    /**
     * In case the PayrollApplicationData was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.PayrollApplicationDataUpdateInput, Prisma.PayrollApplicationDataUncheckedUpdateInput>;
};
/**
 * PayrollApplicationData delete
 */
export type PayrollApplicationDataDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayrollApplicationData
     */
    select?: Prisma.PayrollApplicationDataSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PayrollApplicationData
     */
    omit?: Prisma.PayrollApplicationDataOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PayrollApplicationDataInclude<ExtArgs> | null;
    /**
     * Filter which PayrollApplicationData to delete.
     */
    where: Prisma.PayrollApplicationDataWhereUniqueInput;
};
/**
 * PayrollApplicationData deleteMany
 */
export type PayrollApplicationDataDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which PayrollApplicationData to delete
     */
    where?: Prisma.PayrollApplicationDataWhereInput;
    /**
     * Limit how many PayrollApplicationData to delete.
     */
    limit?: number;
};
/**
 * PayrollApplicationData without action
 */
export type PayrollApplicationDataDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayrollApplicationData
     */
    select?: Prisma.PayrollApplicationDataSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PayrollApplicationData
     */
    omit?: Prisma.PayrollApplicationDataOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PayrollApplicationDataInclude<ExtArgs> | null;
};
export {};
