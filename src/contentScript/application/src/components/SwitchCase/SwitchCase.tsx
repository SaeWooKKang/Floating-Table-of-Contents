import { ReactNode } from 'react'

interface SwitchCaseProps<T extends string | number> {
  value: T
  cases: {
    [K in T]: ReactNode
  }
  defaultCase?: ReactNode
}

/**
 * @summary switch문의 컴포넌트 버전
 * @detail value의 case에 해당하는 컴포넌트 렌더링
 */
export const SwitchCase = <T extends string | number>({
  value,
  cases,
  defaultCase,
}: SwitchCaseProps<T>): ReactNode => {
  const caseValue = cases[value]

  return caseValue !== undefined ? caseValue : defaultCase
}
