import pandas as pd

print("=" * 80)
print("AGRIASSIST DATASET ANALYSIS")
print("=" * 80)

# =====================================================
# Crop Recommendation Dataset
# =====================================================

crop_path = "datasets/crop/Crop_recommendation.csv"

crop_df = pd.read_csv(crop_path)

print("\n\nCROP RECOMMENDATION DATASET")
print("-" * 60)

print("\nFirst 5 Rows:")
print(crop_df.head())

print("\nShape:")
print(crop_df.shape)

print("\nColumns:")
print(crop_df.columns.tolist())

print("\nMissing Values:")
print(crop_df.isnull().sum())

print("\nDuplicate Rows:")
print(crop_df.duplicated().sum())

print("\nData Types:")
print(crop_df.dtypes)

print("\nStatistics:")
print(crop_df.describe())

print("\nUnique Crops:")
print(crop_df["label"].unique())

print("\nCrop Count:")
print(crop_df["label"].value_counts())

# =====================================================
# Yield Dataset
# =====================================================

yield_path = "datasets/yield/crop_yield.csv"

yield_df = pd.read_csv(yield_path)

print("\n\nYIELD DATASET")
print("-" * 60)

print("\nFirst 5 Rows:")
print(yield_df.head())

print("\nShape:")
print(yield_df.shape)

print("\nColumns:")
print(yield_df.columns.tolist())

print("\nMissing Values:")
print(yield_df.isnull().sum())

print("\nDuplicate Rows:")
print(yield_df.duplicated().sum())

print("\nData Types:")
print(yield_df.dtypes)

print("\nStatistics:")
print(yield_df.describe(include="all"))

print("\nUnique Crops:")
if "Crop" in yield_df.columns:
    print(yield_df["Crop"].nunique())