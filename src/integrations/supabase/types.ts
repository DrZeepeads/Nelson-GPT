export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      book_references: {
        Row: {
          citation: string
          created_at: string
          id: string
          section_id: string | null
          subsection_id: string | null
        }
        Insert: {
          citation: string
          created_at?: string
          id?: string
          section_id?: string | null
          subsection_id?: string | null
        }
        Update: {
          citation?: string
          created_at?: string
          id?: string
          section_id?: string | null
          subsection_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "book_references_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_references_subsection_id_fkey"
            columns: ["subsection_id"]
            isOneToOne: false
            referencedRelation: "subsections"
            referencedColumns: ["id"]
          },
        ]
      }
      books: {
        Row: {
          author: string
          created_at: string
          edition: string | null
          id: string
          isbn: string | null
          publication_year: number | null
          title: string
        }
        Insert: {
          author: string
          created_at?: string
          edition?: string | null
          id?: string
          isbn?: string | null
          publication_year?: number | null
          title: string
        }
        Update: {
          author?: string
          created_at?: string
          edition?: string | null
          id?: string
          isbn?: string | null
          publication_year?: number | null
          title?: string
        }
        Relationships: []
      }
      chapters: {
        Row: {
          book_id: string
          chapter_number: number
          created_at: string
          id: string
          summary: string | null
          title: string
        }
        Insert: {
          book_id: string
          chapter_number: number
          created_at?: string
          id?: string
          summary?: string | null
          title: string
        }
        Update: {
          book_id?: string
          chapter_number?: number
          created_at?: string
          id?: string
          summary?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "chapters_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
      chunked_nelson_knowledge: {
        Row: {
          chapter: string
          content: string
          created_at: string | null
          embedding: string | null
          id: string | null
          page_number: number
          topic: string
        }
        Insert: {
          chapter: string
          content: string
          created_at?: string | null
          embedding?: string | null
          id?: string | null
          page_number: number
          topic: string
        }
        Update: {
          chapter?: string
          content?: string
          created_at?: string | null
          embedding?: string | null
          id?: string | null
          page_number?: number
          topic?: string
        }
        Relationships: []
      }
      drugs: {
        Row: {
          category: string
          created_at: string
          dose_per_kg: number
          frequency: string | null
          id: string
          max_dose: number | null
          name: string
          route: string | null
          side_effects: string | null
        }
        Insert: {
          category?: string
          created_at?: string
          dose_per_kg: number
          frequency?: string | null
          id?: string
          max_dose?: number | null
          name: string
          route?: string | null
          side_effects?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          dose_per_kg?: number
          frequency?: string | null
          id?: string
          max_dose?: number | null
          name?: string
          route?: string | null
          side_effects?: string | null
        }
        Relationships: []
      }
      images: {
        Row: {
          caption: string | null
          created_at: string
          id: string
          image_url: string
          section_id: string | null
          subsection_id: string | null
        }
        Insert: {
          caption?: string | null
          created_at?: string
          id?: string
          image_url: string
          section_id?: string | null
          subsection_id?: string | null
        }
        Update: {
          caption?: string | null
          created_at?: string
          id?: string
          image_url?: string
          section_id?: string | null
          subsection_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "images_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "images_subsection_id_fkey"
            columns: ["subsection_id"]
            isOneToOne: false
            referencedRelation: "subsections"
            referencedColumns: ["id"]
          },
        ]
      }
      keywords: {
        Row: {
          context: string | null
          created_at: string
          id: string
          keyword: string
          section_id: string
        }
        Insert: {
          context?: string | null
          created_at?: string
          id?: string
          keyword: string
          section_id: string
        }
        Update: {
          context?: string | null
          created_at?: string
          id?: string
          keyword?: string
          section_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "keywords_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
        ]
      }
      knowledge: {
        Row: {
          chapter: string
          content: string
          created_at: string
          embedding: string | null
          id: string
          page_number: number | null
          searchable: unknown | null
          title: string
        }
        Insert: {
          chapter: string
          content: string
          created_at?: string
          embedding?: string | null
          id?: string
          page_number?: number | null
          searchable?: unknown | null
          title: string
        }
        Update: {
          chapter?: string
          content?: string
          created_at?: string
          embedding?: string | null
          id?: string
          page_number?: number | null
          searchable?: unknown | null
          title?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          role: string
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          role: string
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          role?: string
          user_id?: string | null
        }
        Relationships: []
      }
      nelson_content: {
        Row: {
          chapter: string | null
          content: string
          created_at: string | null
          embedding: string | null
          id: string
          page_number: number | null
          searchable: unknown | null
        }
        Insert: {
          chapter?: string | null
          content: string
          created_at?: string | null
          embedding?: string | null
          id?: string
          page_number?: number | null
          searchable?: unknown | null
        }
        Update: {
          chapter?: string | null
          content?: string
          created_at?: string | null
          embedding?: string | null
          id?: string
          page_number?: number | null
          searchable?: unknown | null
        }
        Relationships: []
      }
      nelson_knowledge: {
        Row: {
          chapter: string
          content: string
          created_at: string
          embedding: string | null
          id: string
          page_number: number
          topic: string
        }
        Insert: {
          chapter: string
          content: string
          created_at?: string
          embedding?: string | null
          id?: string
          page_number: number
          topic: string
        }
        Update: {
          chapter?: string
          content?: string
          created_at?: string
          embedding?: string | null
          id?: string
          page_number?: number
          topic?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["user_role"] | null
        }
        Insert: {
          created_at?: string
          id: string
          role?: Database["public"]["Enums"]["user_role"] | null
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"] | null
        }
        Relationships: []
      }
      reference_citations: {
        Row: {
          authors: string[] | null
          citation: string
          content_id: string | null
          created_at: string | null
          id: string
          journal: string | null
          title: string | null
          validated: boolean | null
          year: number | null
        }
        Insert: {
          authors?: string[] | null
          citation: string
          content_id?: string | null
          created_at?: string | null
          id?: string
          journal?: string | null
          title?: string | null
          validated?: boolean | null
          year?: number | null
        }
        Update: {
          authors?: string[] | null
          citation?: string
          content_id?: string | null
          created_at?: string | null
          id?: string
          journal?: string | null
          title?: string | null
          validated?: boolean | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reference_citations_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "nelson_content"
            referencedColumns: ["id"]
          },
        ]
      }
      sections: {
        Row: {
          chapter_id: string
          content: string
          created_at: string
          id: string
          page_end: number | null
          page_start: number | null
          section_number: number
          title: string | null
        }
        Insert: {
          chapter_id: string
          content: string
          created_at?: string
          id?: string
          page_end?: number | null
          page_start?: number | null
          section_number: number
          title?: string | null
        }
        Update: {
          chapter_id?: string
          content?: string
          created_at?: string
          id?: string
          page_end?: number | null
          page_start?: number | null
          section_number?: number
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sections_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      subsections: {
        Row: {
          content: string
          created_at: string
          id: string
          section_id: string
          subsection_number: number
          title: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          section_id: string
          subsection_number: number
          title?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          section_id?: string
          subsection_number?: number
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subsections_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize:
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      chunk_knowledge: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      gtrgm_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_options: {
        Args: {
          "": unknown
        }
        Returns: undefined
      }
      gtrgm_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      halfvec_avg: {
        Args: {
          "": number[]
        }
        Returns: unknown
      }
      halfvec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      halfvec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      hnsw_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnswhandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      l2_norm:
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      l2_normalize:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      match_knowledge: {
        Args: {
          query_embedding: string
          match_threshold: number
          match_count: number
        }
        Returns: {
          id: string
          title: string
          content: string
          chapter: string
          similarity: number
        }[]
      }
      match_nelson_knowledge: {
        Args: {
          query_embedding: string
          match_threshold: number
          match_count: number
        }
        Returns: {
          id: string
          topic: string
          content: string
          chapter: string
          page_number: number
          similarity: number
        }[]
      }
      match_references_to_content: {
        Args: {
          query_text: string
        }
        Returns: {
          id: string
          citation: string
          content_preview: string
          similarity: number
        }[]
      }
      search_nelson: {
        Args: {
          query: string
        }
        Returns: {
          id: string
          topic: string
          content: string
          chapter: string
          page_number: number
          relevance_score: number
        }[]
      }
      set_limit: {
        Args: {
          "": number
        }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: {
          "": string
        }
        Returns: string[]
      }
      sparsevec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      sparsevec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims:
        | {
            Args: {
              "": string
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
    }
    Enums: {
      user_role: "student" | "doctor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
