// Need to use the React-specific entry point to import createApi
import {
  authenticate,
  deAuthenticate,
  setUser,
} from "@/redux/slices/authSlice";
import { StudentLeaveRecord } from "@/types/data.table.types";
import { IFile } from "@/types/file.types";
import { Leave } from "@/types/leave.types";
import { PopulatedPost, Post } from "@/types/post.types";
import {
  AddStudentPayload,
  ApplyLeavePayload,
  ChangePasswordPayload,
  CreateAnnouncementPayload,
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
  UpdateUserProfilePayload,
} from "@/types/request.types";
import { User } from "@/types/user.types";
import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../axiosBaseQuery";

export const studentPortalApi = createApi({
  reducerPath: "studentPortalApi",
  baseQuery: axiosBaseQuery,
  tagTypes: ["*"],
  endpoints: (builder) => ({
    login: builder.mutation<User, LoginPayload>({
      query: (payload) => ({
        url: `/auth/login`,
        method: "post",
        data: payload,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: user } = await queryFulfilled;
          dispatch(authenticate(user));
        } catch {}
      },
    }),
    register: builder.mutation<User, RegisterPayload>({
      query: (payload) => ({
        url: `/user/register`,
        method: "post",
        data: payload,
      }),
    }),
    logout: builder.mutation<undefined, undefined>({
      query: () => ({
        url: `/auth/logout`,
        method: "post",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(deAuthenticate());
          dispatch(studentPortalApi.util.resetApiState());
        } catch {}
      },
    }),
    changePassword: builder.mutation<User, ChangePasswordPayload>({
      query: (payload) => ({
        url: `/user/change-password`,
        method: "post",
        data: payload,
      }),
    }),
    sendVerificationCode: builder.mutation<undefined, { email: string }>({
      query: (payload) => ({
        url: `/user/send-verification-code`,
        method: "post",
        data: payload,
      }),
    }),
    resetPassword: builder.mutation<undefined, ResetPasswordPayload>({
      query: (payload) => ({
        url: `/user/reset-password`,
        method: "put",
        data: payload,
      }),
    }),
    forgotPassword: builder.mutation<undefined, ForgotPasswordPayload>({
      query: (payload) => ({
        url: `/user/forgot-password`,
        method: "post",
        data: payload,
      }),
    }),
    user: builder.query<User, undefined>({
      query: () => ({
        url: `/user`,
        method: "get",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: user } = await queryFulfilled;
          dispatch(setUser(user));
        } catch {}
      },
    }),
    updateProfile: builder.mutation<User, UpdateUserProfilePayload>({
      query: (payload) => ({
        url: `/user/profile`,
        method: "put",
        data: payload,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: user } = await queryFulfilled;
          dispatch(setUser(user));
        } catch {}
      },
    }),
    changeProfileImage: builder.mutation<User, FormData>({
      query: (payload) => ({
        url: `/user/change-profile-image`,
        method: "put",
        data: payload,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: user } = await queryFulfilled;
          dispatch(setUser(user));
        } catch {}
      },
    }),
    getMyLeaves: builder.query<Leave[], undefined>({
      query: () => ({
        url: `/leave/my-leaves`,
        method: "get",
      }),
    }),
    getAllLeaves: builder.query<StudentLeaveRecord[], undefined>({
      query: () => ({
        url: `/leave/all-leaves`,
        method: "get",
      }),
    }),
    applyLeave: builder.mutation<Leave, ApplyLeavePayload>({
      query: (payload) => ({
        url: `/leave/apply`,
        method: "post",
        data: payload,
      }),
    }),
    leaveApproval: builder.mutation<Leave, { id: string; approved: boolean }>({
      query: ({ id, approved }) => ({
        url: `/leave/approval/${id}`,
        method: "post",
        data: { approved },
      }),
    }),
    deleteLeave: builder.mutation<Leave, string>({
      query: (id) => ({
        url: `/leave/${id}`,
        method: "delete",
      }),
    }),
    getMyStudents: builder.query<User[], undefined>({
      query: () => ({
        url: `/user/my-students`,
        method: "get",
      }),
    }),
    changeUserStatus: builder.mutation<
      User,
      { user_id: string; is_active: boolean }
    >({
      query: (payload) => ({
        url: `/user/change-status`,
        method: "put",
        data: payload,
      }),
    }),
    createUser: builder.mutation<User, AddStudentPayload>({
      query: (payload) => ({
        url: `/user/create`,
        method: "post",
        data: payload,
      }),
    }),
    getAllPosts: builder.query<PopulatedPost[], undefined>({
      query: () => ({
        url: `/post/all`,
        method: "get",
      }),
    }),
    createPost: builder.mutation<Post, CreateAnnouncementPayload>({
      query: (payload) => ({
        url: `/post/create`,
        method: "post",
        data: payload,
      }),
    }),
    getFile: builder.query<string, string>({
      query: (id) => ({
        url: `/file/${id}`,
        method: "get",
        responseType: "arraybuffer",
      }),
      transformResponse: (response: ArrayBuffer) => {
        const blob = new Blob([response]);
        const url = URL.createObjectURL(blob);
        return url;
      },
    }),
    uploadFile: builder.mutation<IFile, FormData>({
      query: (data) => ({
        url: `/file/upload`,
        method: "post",
        data,
      }),
    }),
    deleteFile: builder.mutation<IFile, string>({
      query: (id) => ({
        url: `/file/${id}`,
        method: "delete",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useUserQuery,
  useUpdateProfileMutation,
  useChangeProfileImageMutation,
  useChangePasswordMutation,
  useSendVerificationCodeMutation,
  useResetPasswordMutation,
  useForgotPasswordMutation,
  useGetMyLeavesQuery,
  useGetAllLeavesQuery,
  useApplyLeaveMutation,
  useDeleteLeaveMutation,
  useGetMyStudentsQuery,
  useChangeUserStatusMutation,
  useCreateUserMutation,
  useGetAllPostsQuery,
  useGetFileQuery,
  useLazyGetFileQuery,
  useUploadFileMutation,
  useDeleteFileMutation,
  useCreatePostMutation,
} = studentPortalApi;
