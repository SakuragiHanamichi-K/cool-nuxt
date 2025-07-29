import type mongoose from 'mongoose'

declare module 'nitropack' {
  interface NitroApp {
    mongo: {
      getConnection: (dbName: string) => mongoose.Connection
      getModel: <T = any>(dbName: string, modelKey: string, schema: mongoose.Schema<T>, suffix?: string) => mongoose.Model<T>
    }
  }
}
