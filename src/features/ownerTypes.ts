// Resend invitation api
export interface resendInvitationParam {
    id: number,
}

export interface resendInvitationResponseData {
    success: boolean;
    data: {
        url: string;
        created_by_user: string;
    };
    message: string;
}