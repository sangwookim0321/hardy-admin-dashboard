'use client'

import { TestBasicInfo, SubjectiveTestBasicInfo } from '@/components/molecules/test/TestBasicInfo'
import { ProblemList, Problem } from '@/components/molecules/test/ProblemList'
import { ActionButtons } from '@/components/molecules/test/ActionButtons'
import { useState } from 'react'

const generateUniqueId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

const initialProblem = {
  id: generateUniqueId(),
  number: 1,
  image: '',
  title: '',
  description: '',
  answers: [''],
  score: undefined,
}

const initialBasicInfo: SubjectiveTestBasicInfo = {
  mainImage: '',
  title: '',
  subtitle: '',
  description: '',
  category: '',
  tags: '',
}

export function SubjectiveTestForm() {
  const [basicInfo, setBasicInfo] = useState<SubjectiveTestBasicInfo>(initialBasicInfo)
  const [problems, setProblems] = useState<Problem[]>([initialProblem])

  const addProblem = () => {
    setProblems([
      ...problems,
      {
        id: generateUniqueId(),
        number: problems.length + 1,
        image: '',
        title: '',
        description: '',
        answers: [''],
        score: undefined,
      },
    ])
    // 문제 추가 후 500px 아래로 스크롤
    setTimeout(() => {
      window.scrollBy({ top: 500, behavior: 'smooth' })
    }, 100)
  }

  const removeProblem = (problemId: string) => {
    if (problems.length > 1) {
      const newProblems = problems
        .filter((p) => p.id !== problemId)
        .map((problem, index) => ({
          ...problem,
          number: index + 1,
        }))
      setProblems(newProblems)
    }
  }

  const addAnswer = (problemIndex: number) => {
    const newProblems = [...problems]
    newProblems[problemIndex].answers.push('')
    setProblems(newProblems)
  }

  const removeAnswer = (problemIndex: number, answerIndex: number) => {
    const newProblems = [...problems]
    if (newProblems[problemIndex].answers.length > 1) {
      newProblems[problemIndex].answers.splice(answerIndex, 1)
      setProblems(newProblems)
    }
  }

  const handleProblemChange = (index: number, updatedProblem: Problem) => {
    const newProblems = [...problems]
    newProblems[index] = updatedProblem
    setProblems(newProblems)
  }

  const resetForm = () => {
    if (window.confirm('작성 중인 내용이 모두 초기화됩니다. 계속하시겠습니까?')) {
      setBasicInfo(initialBasicInfo)
      setProblems([{
        ...initialProblem,
        id: generateUniqueId(),
      }])
    }
  }

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Save:', { basicInfo, problems })
  }

  return (
    <div className="pb-20">
      <TestBasicInfo info={basicInfo} onChange={setBasicInfo} />
      <ProblemList
        problems={problems}
        onAddProblem={addProblem}
        onRemoveProblem={removeProblem}
        onAddAnswer={addAnswer}
        onRemoveAnswer={removeAnswer}
        onProblemChange={handleProblemChange}
      />
      <ActionButtons onReset={resetForm} onSave={handleSave} />
    </div>
  )
}
