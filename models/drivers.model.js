module.exports = mongoose => {
    const Driver = mongoose.model("driver",
        mongoose.Schema({
            driver_name: String,
            plate_number: String,
            bus_route: String,
            email: String,
            password: String
        },
        {timestamps: true})
    );

    return Driver;
};