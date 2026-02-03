import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model DenylistedToken
 *
 */
export type DenylistedTokenModel = runtime.Types.Result.DefaultSelection<Prisma.$DenylistedTokenPayload>;
export type AggregateDenylistedToken = {
    _count: DenylistedTokenCountAggregateOutputType | null;
    _min: DenylistedTokenMinAggregateOutputType | null;
    _max: DenylistedTokenMaxAggregateOutputType | null;
};
export type DenylistedTokenMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    jti: string | null;
    expiresAt: Date | null;
    createdAt: Date | null;
};
export type DenylistedTokenMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    jti: string | null;
    expiresAt: Date | null;
    createdAt: Date | null;
};
export type DenylistedTokenCountAggregateOutputType = {
    id: number;
    userId: number;
    jti: number;
    expiresAt: number;
    createdAt: number;
    _all: number;
};
export type DenylistedTokenMinAggregateInputType = {
    id?: true;
    userId?: true;
    jti?: true;
    expiresAt?: true;
    createdAt?: true;
};
export type DenylistedTokenMaxAggregateInputType = {
    id?: true;
    userId?: true;
    jti?: true;
    expiresAt?: true;
    createdAt?: true;
};
export type DenylistedTokenCountAggregateInputType = {
    id?: true;
    userId?: true;
    jti?: true;
    expiresAt?: true;
    createdAt?: true;
    _all?: true;
};
export type DenylistedTokenAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which DenylistedToken to aggregate.
     */
    where?: Prisma.DenylistedTokenWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DenylistedTokens to fetch.
     */
    orderBy?: Prisma.DenylistedTokenOrderByWithRelationInput | Prisma.DenylistedTokenOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.DenylistedTokenWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DenylistedTokens from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DenylistedTokens.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned DenylistedTokens
    **/
    _count?: true | DenylistedTokenCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: DenylistedTokenMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: DenylistedTokenMaxAggregateInputType;
};
export type GetDenylistedTokenAggregateType<T extends DenylistedTokenAggregateArgs> = {
    [P in keyof T & keyof AggregateDenylistedToken]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDenylistedToken[P]> : Prisma.GetScalarType<T[P], AggregateDenylistedToken[P]>;
};
export type DenylistedTokenGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DenylistedTokenWhereInput;
    orderBy?: Prisma.DenylistedTokenOrderByWithAggregationInput | Prisma.DenylistedTokenOrderByWithAggregationInput[];
    by: Prisma.DenylistedTokenScalarFieldEnum[] | Prisma.DenylistedTokenScalarFieldEnum;
    having?: Prisma.DenylistedTokenScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DenylistedTokenCountAggregateInputType | true;
    _min?: DenylistedTokenMinAggregateInputType;
    _max?: DenylistedTokenMaxAggregateInputType;
};
export type DenylistedTokenGroupByOutputType = {
    id: string;
    userId: string;
    jti: string;
    expiresAt: Date;
    createdAt: Date;
    _count: DenylistedTokenCountAggregateOutputType | null;
    _min: DenylistedTokenMinAggregateOutputType | null;
    _max: DenylistedTokenMaxAggregateOutputType | null;
};
type GetDenylistedTokenGroupByPayload<T extends DenylistedTokenGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DenylistedTokenGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DenylistedTokenGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DenylistedTokenGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DenylistedTokenGroupByOutputType[P]>;
}>>;
export type DenylistedTokenWhereInput = {
    AND?: Prisma.DenylistedTokenWhereInput | Prisma.DenylistedTokenWhereInput[];
    OR?: Prisma.DenylistedTokenWhereInput[];
    NOT?: Prisma.DenylistedTokenWhereInput | Prisma.DenylistedTokenWhereInput[];
    id?: Prisma.StringFilter<"DenylistedToken"> | string;
    userId?: Prisma.StringFilter<"DenylistedToken"> | string;
    jti?: Prisma.StringFilter<"DenylistedToken"> | string;
    expiresAt?: Prisma.DateTimeFilter<"DenylistedToken"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"DenylistedToken"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type DenylistedTokenOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    jti?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type DenylistedTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    jti?: string;
    AND?: Prisma.DenylistedTokenWhereInput | Prisma.DenylistedTokenWhereInput[];
    OR?: Prisma.DenylistedTokenWhereInput[];
    NOT?: Prisma.DenylistedTokenWhereInput | Prisma.DenylistedTokenWhereInput[];
    userId?: Prisma.StringFilter<"DenylistedToken"> | string;
    expiresAt?: Prisma.DateTimeFilter<"DenylistedToken"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"DenylistedToken"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "jti">;
export type DenylistedTokenOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    jti?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.DenylistedTokenCountOrderByAggregateInput;
    _max?: Prisma.DenylistedTokenMaxOrderByAggregateInput;
    _min?: Prisma.DenylistedTokenMinOrderByAggregateInput;
};
export type DenylistedTokenScalarWhereWithAggregatesInput = {
    AND?: Prisma.DenylistedTokenScalarWhereWithAggregatesInput | Prisma.DenylistedTokenScalarWhereWithAggregatesInput[];
    OR?: Prisma.DenylistedTokenScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DenylistedTokenScalarWhereWithAggregatesInput | Prisma.DenylistedTokenScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"DenylistedToken"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"DenylistedToken"> | string;
    jti?: Prisma.StringWithAggregatesFilter<"DenylistedToken"> | string;
    expiresAt?: Prisma.DateTimeWithAggregatesFilter<"DenylistedToken"> | Date | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"DenylistedToken"> | Date | string;
};
export type DenylistedTokenCreateInput = {
    id?: string;
    jti: string;
    expiresAt: Date | string;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutDenylistedTokensInput;
};
export type DenylistedTokenUncheckedCreateInput = {
    id?: string;
    userId: string;
    jti: string;
    expiresAt: Date | string;
    createdAt?: Date | string;
};
export type DenylistedTokenUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    jti?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutDenylistedTokensNestedInput;
};
export type DenylistedTokenUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    jti?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DenylistedTokenCreateManyInput = {
    id?: string;
    userId: string;
    jti: string;
    expiresAt: Date | string;
    createdAt?: Date | string;
};
export type DenylistedTokenUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    jti?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DenylistedTokenUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    jti?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DenylistedTokenListRelationFilter = {
    every?: Prisma.DenylistedTokenWhereInput;
    some?: Prisma.DenylistedTokenWhereInput;
    none?: Prisma.DenylistedTokenWhereInput;
};
export type DenylistedTokenOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type DenylistedTokenCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    jti?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DenylistedTokenMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    jti?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DenylistedTokenMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    jti?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DenylistedTokenCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.DenylistedTokenCreateWithoutUserInput, Prisma.DenylistedTokenUncheckedCreateWithoutUserInput> | Prisma.DenylistedTokenCreateWithoutUserInput[] | Prisma.DenylistedTokenUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.DenylistedTokenCreateOrConnectWithoutUserInput | Prisma.DenylistedTokenCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.DenylistedTokenCreateManyUserInputEnvelope;
    connect?: Prisma.DenylistedTokenWhereUniqueInput | Prisma.DenylistedTokenWhereUniqueInput[];
};
export type DenylistedTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.DenylistedTokenCreateWithoutUserInput, Prisma.DenylistedTokenUncheckedCreateWithoutUserInput> | Prisma.DenylistedTokenCreateWithoutUserInput[] | Prisma.DenylistedTokenUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.DenylistedTokenCreateOrConnectWithoutUserInput | Prisma.DenylistedTokenCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.DenylistedTokenCreateManyUserInputEnvelope;
    connect?: Prisma.DenylistedTokenWhereUniqueInput | Prisma.DenylistedTokenWhereUniqueInput[];
};
export type DenylistedTokenUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.DenylistedTokenCreateWithoutUserInput, Prisma.DenylistedTokenUncheckedCreateWithoutUserInput> | Prisma.DenylistedTokenCreateWithoutUserInput[] | Prisma.DenylistedTokenUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.DenylistedTokenCreateOrConnectWithoutUserInput | Prisma.DenylistedTokenCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.DenylistedTokenUpsertWithWhereUniqueWithoutUserInput | Prisma.DenylistedTokenUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.DenylistedTokenCreateManyUserInputEnvelope;
    set?: Prisma.DenylistedTokenWhereUniqueInput | Prisma.DenylistedTokenWhereUniqueInput[];
    disconnect?: Prisma.DenylistedTokenWhereUniqueInput | Prisma.DenylistedTokenWhereUniqueInput[];
    delete?: Prisma.DenylistedTokenWhereUniqueInput | Prisma.DenylistedTokenWhereUniqueInput[];
    connect?: Prisma.DenylistedTokenWhereUniqueInput | Prisma.DenylistedTokenWhereUniqueInput[];
    update?: Prisma.DenylistedTokenUpdateWithWhereUniqueWithoutUserInput | Prisma.DenylistedTokenUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.DenylistedTokenUpdateManyWithWhereWithoutUserInput | Prisma.DenylistedTokenUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.DenylistedTokenScalarWhereInput | Prisma.DenylistedTokenScalarWhereInput[];
};
export type DenylistedTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.DenylistedTokenCreateWithoutUserInput, Prisma.DenylistedTokenUncheckedCreateWithoutUserInput> | Prisma.DenylistedTokenCreateWithoutUserInput[] | Prisma.DenylistedTokenUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.DenylistedTokenCreateOrConnectWithoutUserInput | Prisma.DenylistedTokenCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.DenylistedTokenUpsertWithWhereUniqueWithoutUserInput | Prisma.DenylistedTokenUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.DenylistedTokenCreateManyUserInputEnvelope;
    set?: Prisma.DenylistedTokenWhereUniqueInput | Prisma.DenylistedTokenWhereUniqueInput[];
    disconnect?: Prisma.DenylistedTokenWhereUniqueInput | Prisma.DenylistedTokenWhereUniqueInput[];
    delete?: Prisma.DenylistedTokenWhereUniqueInput | Prisma.DenylistedTokenWhereUniqueInput[];
    connect?: Prisma.DenylistedTokenWhereUniqueInput | Prisma.DenylistedTokenWhereUniqueInput[];
    update?: Prisma.DenylistedTokenUpdateWithWhereUniqueWithoutUserInput | Prisma.DenylistedTokenUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.DenylistedTokenUpdateManyWithWhereWithoutUserInput | Prisma.DenylistedTokenUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.DenylistedTokenScalarWhereInput | Prisma.DenylistedTokenScalarWhereInput[];
};
export type DenylistedTokenCreateWithoutUserInput = {
    id?: string;
    jti: string;
    expiresAt: Date | string;
    createdAt?: Date | string;
};
export type DenylistedTokenUncheckedCreateWithoutUserInput = {
    id?: string;
    jti: string;
    expiresAt: Date | string;
    createdAt?: Date | string;
};
export type DenylistedTokenCreateOrConnectWithoutUserInput = {
    where: Prisma.DenylistedTokenWhereUniqueInput;
    create: Prisma.XOR<Prisma.DenylistedTokenCreateWithoutUserInput, Prisma.DenylistedTokenUncheckedCreateWithoutUserInput>;
};
export type DenylistedTokenCreateManyUserInputEnvelope = {
    data: Prisma.DenylistedTokenCreateManyUserInput | Prisma.DenylistedTokenCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type DenylistedTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.DenylistedTokenWhereUniqueInput;
    update: Prisma.XOR<Prisma.DenylistedTokenUpdateWithoutUserInput, Prisma.DenylistedTokenUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.DenylistedTokenCreateWithoutUserInput, Prisma.DenylistedTokenUncheckedCreateWithoutUserInput>;
};
export type DenylistedTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.DenylistedTokenWhereUniqueInput;
    data: Prisma.XOR<Prisma.DenylistedTokenUpdateWithoutUserInput, Prisma.DenylistedTokenUncheckedUpdateWithoutUserInput>;
};
export type DenylistedTokenUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.DenylistedTokenScalarWhereInput;
    data: Prisma.XOR<Prisma.DenylistedTokenUpdateManyMutationInput, Prisma.DenylistedTokenUncheckedUpdateManyWithoutUserInput>;
};
export type DenylistedTokenScalarWhereInput = {
    AND?: Prisma.DenylistedTokenScalarWhereInput | Prisma.DenylistedTokenScalarWhereInput[];
    OR?: Prisma.DenylistedTokenScalarWhereInput[];
    NOT?: Prisma.DenylistedTokenScalarWhereInput | Prisma.DenylistedTokenScalarWhereInput[];
    id?: Prisma.StringFilter<"DenylistedToken"> | string;
    userId?: Prisma.StringFilter<"DenylistedToken"> | string;
    jti?: Prisma.StringFilter<"DenylistedToken"> | string;
    expiresAt?: Prisma.DateTimeFilter<"DenylistedToken"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"DenylistedToken"> | Date | string;
};
export type DenylistedTokenCreateManyUserInput = {
    id?: string;
    jti: string;
    expiresAt: Date | string;
    createdAt?: Date | string;
};
export type DenylistedTokenUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    jti?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DenylistedTokenUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    jti?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DenylistedTokenUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    jti?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DenylistedTokenSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    jti?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["denylistedToken"]>;
export type DenylistedTokenSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    jti?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["denylistedToken"]>;
export type DenylistedTokenSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    jti?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["denylistedToken"]>;
export type DenylistedTokenSelectScalar = {
    id?: boolean;
    userId?: boolean;
    jti?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
};
export type DenylistedTokenOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "jti" | "expiresAt" | "createdAt", ExtArgs["result"]["denylistedToken"]>;
export type DenylistedTokenInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type DenylistedTokenIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type DenylistedTokenIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $DenylistedTokenPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "DenylistedToken";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        jti: string;
        expiresAt: Date;
        createdAt: Date;
    }, ExtArgs["result"]["denylistedToken"]>;
    composites: {};
};
export type DenylistedTokenGetPayload<S extends boolean | null | undefined | DenylistedTokenDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DenylistedTokenPayload, S>;
export type DenylistedTokenCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DenylistedTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DenylistedTokenCountAggregateInputType | true;
};
export interface DenylistedTokenDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['DenylistedToken'];
        meta: {
            name: 'DenylistedToken';
        };
    };
    /**
     * Find zero or one DenylistedToken that matches the filter.
     * @param {DenylistedTokenFindUniqueArgs} args - Arguments to find a DenylistedToken
     * @example
     * // Get one DenylistedToken
     * const denylistedToken = await prisma.denylistedToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DenylistedTokenFindUniqueArgs>(args: Prisma.SelectSubset<T, DenylistedTokenFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DenylistedTokenClient<runtime.Types.Result.GetResult<Prisma.$DenylistedTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one DenylistedToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DenylistedTokenFindUniqueOrThrowArgs} args - Arguments to find a DenylistedToken
     * @example
     * // Get one DenylistedToken
     * const denylistedToken = await prisma.denylistedToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DenylistedTokenFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DenylistedTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DenylistedTokenClient<runtime.Types.Result.GetResult<Prisma.$DenylistedTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first DenylistedToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DenylistedTokenFindFirstArgs} args - Arguments to find a DenylistedToken
     * @example
     * // Get one DenylistedToken
     * const denylistedToken = await prisma.denylistedToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DenylistedTokenFindFirstArgs>(args?: Prisma.SelectSubset<T, DenylistedTokenFindFirstArgs<ExtArgs>>): Prisma.Prisma__DenylistedTokenClient<runtime.Types.Result.GetResult<Prisma.$DenylistedTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first DenylistedToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DenylistedTokenFindFirstOrThrowArgs} args - Arguments to find a DenylistedToken
     * @example
     * // Get one DenylistedToken
     * const denylistedToken = await prisma.denylistedToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DenylistedTokenFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DenylistedTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DenylistedTokenClient<runtime.Types.Result.GetResult<Prisma.$DenylistedTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more DenylistedTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DenylistedTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DenylistedTokens
     * const denylistedTokens = await prisma.denylistedToken.findMany()
     *
     * // Get first 10 DenylistedTokens
     * const denylistedTokens = await prisma.denylistedToken.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const denylistedTokenWithIdOnly = await prisma.denylistedToken.findMany({ select: { id: true } })
     *
     */
    findMany<T extends DenylistedTokenFindManyArgs>(args?: Prisma.SelectSubset<T, DenylistedTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DenylistedTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a DenylistedToken.
     * @param {DenylistedTokenCreateArgs} args - Arguments to create a DenylistedToken.
     * @example
     * // Create one DenylistedToken
     * const DenylistedToken = await prisma.denylistedToken.create({
     *   data: {
     *     // ... data to create a DenylistedToken
     *   }
     * })
     *
     */
    create<T extends DenylistedTokenCreateArgs>(args: Prisma.SelectSubset<T, DenylistedTokenCreateArgs<ExtArgs>>): Prisma.Prisma__DenylistedTokenClient<runtime.Types.Result.GetResult<Prisma.$DenylistedTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many DenylistedTokens.
     * @param {DenylistedTokenCreateManyArgs} args - Arguments to create many DenylistedTokens.
     * @example
     * // Create many DenylistedTokens
     * const denylistedToken = await prisma.denylistedToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends DenylistedTokenCreateManyArgs>(args?: Prisma.SelectSubset<T, DenylistedTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many DenylistedTokens and returns the data saved in the database.
     * @param {DenylistedTokenCreateManyAndReturnArgs} args - Arguments to create many DenylistedTokens.
     * @example
     * // Create many DenylistedTokens
     * const denylistedToken = await prisma.denylistedToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many DenylistedTokens and only return the `id`
     * const denylistedTokenWithIdOnly = await prisma.denylistedToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends DenylistedTokenCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DenylistedTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DenylistedTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a DenylistedToken.
     * @param {DenylistedTokenDeleteArgs} args - Arguments to delete one DenylistedToken.
     * @example
     * // Delete one DenylistedToken
     * const DenylistedToken = await prisma.denylistedToken.delete({
     *   where: {
     *     // ... filter to delete one DenylistedToken
     *   }
     * })
     *
     */
    delete<T extends DenylistedTokenDeleteArgs>(args: Prisma.SelectSubset<T, DenylistedTokenDeleteArgs<ExtArgs>>): Prisma.Prisma__DenylistedTokenClient<runtime.Types.Result.GetResult<Prisma.$DenylistedTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one DenylistedToken.
     * @param {DenylistedTokenUpdateArgs} args - Arguments to update one DenylistedToken.
     * @example
     * // Update one DenylistedToken
     * const denylistedToken = await prisma.denylistedToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends DenylistedTokenUpdateArgs>(args: Prisma.SelectSubset<T, DenylistedTokenUpdateArgs<ExtArgs>>): Prisma.Prisma__DenylistedTokenClient<runtime.Types.Result.GetResult<Prisma.$DenylistedTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more DenylistedTokens.
     * @param {DenylistedTokenDeleteManyArgs} args - Arguments to filter DenylistedTokens to delete.
     * @example
     * // Delete a few DenylistedTokens
     * const { count } = await prisma.denylistedToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends DenylistedTokenDeleteManyArgs>(args?: Prisma.SelectSubset<T, DenylistedTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more DenylistedTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DenylistedTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DenylistedTokens
     * const denylistedToken = await prisma.denylistedToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends DenylistedTokenUpdateManyArgs>(args: Prisma.SelectSubset<T, DenylistedTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more DenylistedTokens and returns the data updated in the database.
     * @param {DenylistedTokenUpdateManyAndReturnArgs} args - Arguments to update many DenylistedTokens.
     * @example
     * // Update many DenylistedTokens
     * const denylistedToken = await prisma.denylistedToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more DenylistedTokens and only return the `id`
     * const denylistedTokenWithIdOnly = await prisma.denylistedToken.updateManyAndReturn({
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
    updateManyAndReturn<T extends DenylistedTokenUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DenylistedTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DenylistedTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one DenylistedToken.
     * @param {DenylistedTokenUpsertArgs} args - Arguments to update or create a DenylistedToken.
     * @example
     * // Update or create a DenylistedToken
     * const denylistedToken = await prisma.denylistedToken.upsert({
     *   create: {
     *     // ... data to create a DenylistedToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DenylistedToken we want to update
     *   }
     * })
     */
    upsert<T extends DenylistedTokenUpsertArgs>(args: Prisma.SelectSubset<T, DenylistedTokenUpsertArgs<ExtArgs>>): Prisma.Prisma__DenylistedTokenClient<runtime.Types.Result.GetResult<Prisma.$DenylistedTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of DenylistedTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DenylistedTokenCountArgs} args - Arguments to filter DenylistedTokens to count.
     * @example
     * // Count the number of DenylistedTokens
     * const count = await prisma.denylistedToken.count({
     *   where: {
     *     // ... the filter for the DenylistedTokens we want to count
     *   }
     * })
    **/
    count<T extends DenylistedTokenCountArgs>(args?: Prisma.Subset<T, DenylistedTokenCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DenylistedTokenCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a DenylistedToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DenylistedTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DenylistedTokenAggregateArgs>(args: Prisma.Subset<T, DenylistedTokenAggregateArgs>): Prisma.PrismaPromise<GetDenylistedTokenAggregateType<T>>;
    /**
     * Group by DenylistedToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DenylistedTokenGroupByArgs} args - Group by arguments.
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
    groupBy<T extends DenylistedTokenGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DenylistedTokenGroupByArgs['orderBy'];
    } : {
        orderBy?: DenylistedTokenGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DenylistedTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDenylistedTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the DenylistedToken model
     */
    readonly fields: DenylistedTokenFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for DenylistedToken.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__DenylistedTokenClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the DenylistedToken model
 */
export interface DenylistedTokenFieldRefs {
    readonly id: Prisma.FieldRef<"DenylistedToken", 'String'>;
    readonly userId: Prisma.FieldRef<"DenylistedToken", 'String'>;
    readonly jti: Prisma.FieldRef<"DenylistedToken", 'String'>;
    readonly expiresAt: Prisma.FieldRef<"DenylistedToken", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"DenylistedToken", 'DateTime'>;
}
/**
 * DenylistedToken findUnique
 */
export type DenylistedTokenFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DenylistedToken
     */
    select?: Prisma.DenylistedTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DenylistedToken
     */
    omit?: Prisma.DenylistedTokenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DenylistedTokenInclude<ExtArgs> | null;
    /**
     * Filter, which DenylistedToken to fetch.
     */
    where: Prisma.DenylistedTokenWhereUniqueInput;
};
/**
 * DenylistedToken findUniqueOrThrow
 */
export type DenylistedTokenFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DenylistedToken
     */
    select?: Prisma.DenylistedTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DenylistedToken
     */
    omit?: Prisma.DenylistedTokenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DenylistedTokenInclude<ExtArgs> | null;
    /**
     * Filter, which DenylistedToken to fetch.
     */
    where: Prisma.DenylistedTokenWhereUniqueInput;
};
/**
 * DenylistedToken findFirst
 */
export type DenylistedTokenFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DenylistedToken
     */
    select?: Prisma.DenylistedTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DenylistedToken
     */
    omit?: Prisma.DenylistedTokenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DenylistedTokenInclude<ExtArgs> | null;
    /**
     * Filter, which DenylistedToken to fetch.
     */
    where?: Prisma.DenylistedTokenWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DenylistedTokens to fetch.
     */
    orderBy?: Prisma.DenylistedTokenOrderByWithRelationInput | Prisma.DenylistedTokenOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for DenylistedTokens.
     */
    cursor?: Prisma.DenylistedTokenWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DenylistedTokens from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DenylistedTokens.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of DenylistedTokens.
     */
    distinct?: Prisma.DenylistedTokenScalarFieldEnum | Prisma.DenylistedTokenScalarFieldEnum[];
};
/**
 * DenylistedToken findFirstOrThrow
 */
export type DenylistedTokenFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DenylistedToken
     */
    select?: Prisma.DenylistedTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DenylistedToken
     */
    omit?: Prisma.DenylistedTokenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DenylistedTokenInclude<ExtArgs> | null;
    /**
     * Filter, which DenylistedToken to fetch.
     */
    where?: Prisma.DenylistedTokenWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DenylistedTokens to fetch.
     */
    orderBy?: Prisma.DenylistedTokenOrderByWithRelationInput | Prisma.DenylistedTokenOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for DenylistedTokens.
     */
    cursor?: Prisma.DenylistedTokenWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DenylistedTokens from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DenylistedTokens.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of DenylistedTokens.
     */
    distinct?: Prisma.DenylistedTokenScalarFieldEnum | Prisma.DenylistedTokenScalarFieldEnum[];
};
/**
 * DenylistedToken findMany
 */
export type DenylistedTokenFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DenylistedToken
     */
    select?: Prisma.DenylistedTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DenylistedToken
     */
    omit?: Prisma.DenylistedTokenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DenylistedTokenInclude<ExtArgs> | null;
    /**
     * Filter, which DenylistedTokens to fetch.
     */
    where?: Prisma.DenylistedTokenWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DenylistedTokens to fetch.
     */
    orderBy?: Prisma.DenylistedTokenOrderByWithRelationInput | Prisma.DenylistedTokenOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing DenylistedTokens.
     */
    cursor?: Prisma.DenylistedTokenWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DenylistedTokens from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DenylistedTokens.
     */
    skip?: number;
    distinct?: Prisma.DenylistedTokenScalarFieldEnum | Prisma.DenylistedTokenScalarFieldEnum[];
};
/**
 * DenylistedToken create
 */
export type DenylistedTokenCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DenylistedToken
     */
    select?: Prisma.DenylistedTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DenylistedToken
     */
    omit?: Prisma.DenylistedTokenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DenylistedTokenInclude<ExtArgs> | null;
    /**
     * The data needed to create a DenylistedToken.
     */
    data: Prisma.XOR<Prisma.DenylistedTokenCreateInput, Prisma.DenylistedTokenUncheckedCreateInput>;
};
/**
 * DenylistedToken createMany
 */
export type DenylistedTokenCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many DenylistedTokens.
     */
    data: Prisma.DenylistedTokenCreateManyInput | Prisma.DenylistedTokenCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * DenylistedToken createManyAndReturn
 */
export type DenylistedTokenCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DenylistedToken
     */
    select?: Prisma.DenylistedTokenSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the DenylistedToken
     */
    omit?: Prisma.DenylistedTokenOmit<ExtArgs> | null;
    /**
     * The data used to create many DenylistedTokens.
     */
    data: Prisma.DenylistedTokenCreateManyInput | Prisma.DenylistedTokenCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DenylistedTokenIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * DenylistedToken update
 */
export type DenylistedTokenUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DenylistedToken
     */
    select?: Prisma.DenylistedTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DenylistedToken
     */
    omit?: Prisma.DenylistedTokenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DenylistedTokenInclude<ExtArgs> | null;
    /**
     * The data needed to update a DenylistedToken.
     */
    data: Prisma.XOR<Prisma.DenylistedTokenUpdateInput, Prisma.DenylistedTokenUncheckedUpdateInput>;
    /**
     * Choose, which DenylistedToken to update.
     */
    where: Prisma.DenylistedTokenWhereUniqueInput;
};
/**
 * DenylistedToken updateMany
 */
export type DenylistedTokenUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update DenylistedTokens.
     */
    data: Prisma.XOR<Prisma.DenylistedTokenUpdateManyMutationInput, Prisma.DenylistedTokenUncheckedUpdateManyInput>;
    /**
     * Filter which DenylistedTokens to update
     */
    where?: Prisma.DenylistedTokenWhereInput;
    /**
     * Limit how many DenylistedTokens to update.
     */
    limit?: number;
};
/**
 * DenylistedToken updateManyAndReturn
 */
export type DenylistedTokenUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DenylistedToken
     */
    select?: Prisma.DenylistedTokenSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the DenylistedToken
     */
    omit?: Prisma.DenylistedTokenOmit<ExtArgs> | null;
    /**
     * The data used to update DenylistedTokens.
     */
    data: Prisma.XOR<Prisma.DenylistedTokenUpdateManyMutationInput, Prisma.DenylistedTokenUncheckedUpdateManyInput>;
    /**
     * Filter which DenylistedTokens to update
     */
    where?: Prisma.DenylistedTokenWhereInput;
    /**
     * Limit how many DenylistedTokens to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DenylistedTokenIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * DenylistedToken upsert
 */
export type DenylistedTokenUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DenylistedToken
     */
    select?: Prisma.DenylistedTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DenylistedToken
     */
    omit?: Prisma.DenylistedTokenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DenylistedTokenInclude<ExtArgs> | null;
    /**
     * The filter to search for the DenylistedToken to update in case it exists.
     */
    where: Prisma.DenylistedTokenWhereUniqueInput;
    /**
     * In case the DenylistedToken found by the `where` argument doesn't exist, create a new DenylistedToken with this data.
     */
    create: Prisma.XOR<Prisma.DenylistedTokenCreateInput, Prisma.DenylistedTokenUncheckedCreateInput>;
    /**
     * In case the DenylistedToken was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.DenylistedTokenUpdateInput, Prisma.DenylistedTokenUncheckedUpdateInput>;
};
/**
 * DenylistedToken delete
 */
export type DenylistedTokenDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DenylistedToken
     */
    select?: Prisma.DenylistedTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DenylistedToken
     */
    omit?: Prisma.DenylistedTokenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DenylistedTokenInclude<ExtArgs> | null;
    /**
     * Filter which DenylistedToken to delete.
     */
    where: Prisma.DenylistedTokenWhereUniqueInput;
};
/**
 * DenylistedToken deleteMany
 */
export type DenylistedTokenDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which DenylistedTokens to delete
     */
    where?: Prisma.DenylistedTokenWhereInput;
    /**
     * Limit how many DenylistedTokens to delete.
     */
    limit?: number;
};
/**
 * DenylistedToken without action
 */
export type DenylistedTokenDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DenylistedToken
     */
    select?: Prisma.DenylistedTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DenylistedToken
     */
    omit?: Prisma.DenylistedTokenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DenylistedTokenInclude<ExtArgs> | null;
};
export {};
