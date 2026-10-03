from yield_prediction import predict_yield

result = predict_yield(
    crop="Rice",
    year=2020,
    season="Kharif",
    state="Karnataka",
    area=100,
    production=250,
    fertilizer=150,
    pesticide=30
)

print(result)