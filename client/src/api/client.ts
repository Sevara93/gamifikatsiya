import axios from 'axios'
import { useAppStore } from '../store/useAppStore'

export const api = axios.create({ baseURL: '/api' })

api.interceptors.request.use((config) => {
  const token = useAppStore.getState().token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export interface ChildGroup {
  id: string
  name: string
  level: string
}

export interface Child {
  id: string
  fullName: string
  group: ChildGroup
}

export interface ProgressRow {
  id: string
  childId: string
  lab: string
  week: number
  isCompleted: boolean
  score: number
  completedAt: string | null
}

export interface ProgressResponse {
  progress: ProgressRow[]
  unlockedWeeks: Record<string, number[]>
}

export interface GroupSummary {
  id: string
  name: string
  level: string
}

export interface ChildSummary {
  id: string
  fullName: string
}

export const authApi = {
  login: (childId: string) =>
    api.post<{ token: string; child: Child }>('/auth/login', { childId }),
}

export const groupsApi = {
  getByLevel: (level: string) =>
    api.get<GroupSummary[]>('/groups', { params: { level } }),
  getChildren: (groupId: string) =>
    api.get<ChildSummary[]>(`/groups/${groupId}/children`),
}

export const progressApi = {
  getAll: () => api.get<ProgressResponse>('/progress'),
  complete: (lab: string, week: number, score: number) =>
    api.post<ProgressResponse>('/progress/complete', { lab, week, score }),
}
