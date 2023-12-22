# Pandas

## Data Engineering 

### DF to DDL

Create DDL from dataframe
```python
# SOURCE = Dataframe
# TARGET = Table Name

sql_text = pd.io.sql.get_schema(SOURCE.reset_index(), TARGET)   
```

