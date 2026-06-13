export const createOrder = async (req, res, next) => {
    try {

    }
    catch (error) {
        return res.status(400).json({ message: "Internal server error", })
    }
}
export const getOrders = async (req, res) => {
    try {

    }
    catch (error) {

    }
}

export const updateOrderstatus = async (req, res) => {
    try {

    }
    catch (error) {

    }
}

export const getorderById = async (req, res) => {
    try {

    } catch (error) {
        return res.status(401).json({ message: "Internal Server error", error });
    }
}

export const deleteOrderbyId = async (req, res) => {
    try {

    }
    catch (error) {

    }
}
