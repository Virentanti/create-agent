import dotenv from "dotenv"
import { z} from "zod"

dotenv.config()

const EnvSchema = z.object({
    OPENROUTER_API_KEY:
    z.string()
})

export const env = EnvSchema.parse(
    process.env
)