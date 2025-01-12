import { Button } from '@/components/atoms/button/Button'
import { Card } from '@/components/atoms/card/Card'
import { Input } from '@/components/atoms/input/Input'
import { Textarea } from '@/components/atoms/textarea/Textarea'
import { ImageUploader } from '@/components/atoms/imageUploader/ImageUploader'
import { FiPlus, FiX } from 'react-icons/fi'

export interface Problem {
  id: string
  number: number
  image: string
  title: string
  description?: string
  answers: string[]
  score?: number
}

interface ProblemListProps {
  problems: Problem[]
  onAddProblem: () => void
  onRemoveProblem: (id: string) => void
  onAddAnswer: (problemIndex: number) => void
  onRemoveAnswer: (problemIndex: number, answerIndex: number) => void
  onProblemChange: (index: number, problem: Problem) => void
}

export function ProblemList({
  problems,
  onAddProblem,
  onRemoveProblem,
  onAddAnswer,
  onRemoveAnswer,
  onProblemChange,
}: ProblemListProps) {
  return (
    <div className="space-y-6">
      {problems.map((problem, index) => (
        <Card key={problem.id} className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">문제 {problem.number}</h3>
            {problems.length > 1 && (
              <button
                onClick={() => onRemoveProblem(problem.id)}
                className="p-1 hover:bg-gray-100 rounded-full text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="space-y-6">
            <ImageUploader
              image={problem.image}
              onImageChange={(image) =>
                onProblemChange(index, {
                  ...problem,
                  image,
                })
              }
              label="문제 이미지를 등록해주세요."
            />

            <div>
              <p className="mb-1 text-sm font-medium text-gray-700">문제 제목</p>
              <Input
                placeholder="문제 제목을 입력하세요"
                value={problem.title}
                onChange={(e) =>
                  onProblemChange(index, {
                    ...problem,
                    title: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <p className="mb-1 text-sm font-medium text-gray-700">문제 설명 (선택사항)</p>
              <Textarea
                placeholder="문제에 대한 설명을 입력하세요"
                value={problem.description}
                onChange={(e) =>
                  onProblemChange(index, {
                    ...problem,
                    description: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-4">
              <p className="mb-1 text-sm font-medium text-gray-700">정답</p>
              {problem.answers.map((answer, answerIndex) => (
                <div key={answerIndex} className="flex gap-2">
                  <Input
                    placeholder={`정답 ${answerIndex + 1}`}
                    className="mb-2"
                    value={answer}
                    onChange={(e) => {
                      const newAnswers = [...problem.answers]
                      newAnswers[answerIndex] = e.target.value
                      onProblemChange(index, {
                        ...problem,
                        answers: newAnswers,
                      })
                    }}
                  />
                  {problem.answers.length > 1 && (
                    <button
                      onClick={() => onRemoveAnswer(index, answerIndex)}
                      className="p-1 hover:bg-gray-100 rounded-full text-gray-500 hover:text-gray-700"
                    >
                      <FiX className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => onAddAnswer(index)}
                className="flex items-center justify-center"
              >
                <FiPlus className="w-4 h-4 mr-2" />
                정답 추가
              </Button>
            </div>

            <div className="w-24">
              <p className="mb-1 text-sm font-medium text-gray-700">배점 (선택사항)</p>
              <Input
                type="number"
                placeholder="배점"
                className="w-32"
                value={problem.score || ''}
                onChange={(e) =>
                  onProblemChange(index, {
                    ...problem,
                    score: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
              />
            </div>
          </div>
        </Card>
      ))}

      <div className="flex justify-center">
        <Button variant="outline" onClick={onAddProblem} className="flex items-center justify-center">
          <FiPlus className="w-4 h-4 mr-2" />
          문제 추가
        </Button>
      </div>
    </div>
  )
}
