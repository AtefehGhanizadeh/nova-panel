import { dictionaries } from '@/Dictionary'
import { useAppSelector } from '@/Redux/hooks'
import { getTextDirection } from '@/Utils/getTextDirection'

export function useTranslation() {
  const language = useAppSelector((state) => state.settings.language)

  return {
    t: dictionaries[language],
    language,
    dir: getTextDirection(language),
  }
}
