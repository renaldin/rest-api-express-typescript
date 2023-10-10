const ok = (status: number, message: string | null, data: any | null) => {
  const response = {
    status: status,
    message: message,
    data: data
  }

  return response
}

const badRequest = (status: number, error: any | null) => {
  if (error != null && error instanceof Error) {
    const response = {
      status: status,
      message: error.message,
      errors: error
    }

    return response
  }
}

const notFound = (status: number, error: any | null) => {
  if(error != null) {
    const errors = {
      errors: {
        message: error
      }
    }

    const response = {
      status: status,
      message: errors.errors.message,
      errors: errors,
      data: null
    }

    return response
  }
}

const validateError = (status: number, message: string | null, error: any | null) => {
  const response = {
    status: status,
    message: message,
    errors: error
  }

  return response
}

export default { ok, badRequest, notFound, validateError }